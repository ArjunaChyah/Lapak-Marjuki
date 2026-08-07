import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createMidtransTransaction } from '@/lib/midtrans';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cart, orderDetails } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ success: false, error: 'Keranjang belanja kosong' }, { status: 400 });
    }

    if (!orderDetails || !orderDetails.fullName || !orderDetails.phoneNumber) {
      return NextResponse.json({ success: false, error: 'Data pemesan tidak lengkap' }, { status: 400 });
    }

    const orderNumber = `WM-${Date.now().toString().slice(-6)}`;
    const deliveryFee = orderDetails.deliveryMethod === 'diantar' ? 5000 : 0;
    const subtotal = cart.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);
    const grandTotal = subtotal + deliveryFee;

    // Create order record in MySQL with PENDING status
    let savedOrder = null;
    try {
      savedOrder = await prisma.order.create({
        data: {
          orderNumber,
          fullName: orderDetails.fullName,
          phoneNumber: orderDetails.phoneNumber,
          deliveryAddress: orderDetails.deliveryAddress || null,
          notes: orderDetails.notes || null,
          deliveryMethod: orderDetails.deliveryMethod === 'ambil-sendiri' ? 'ambil_sendiri' : 'diantar',
          paymentMethod: orderDetails.paymentMethod === 'transfer' ? 'transfer' : orderDetails.paymentMethod === 'qris' ? 'qris' : 'cash',
          subtotal: grandTotal,
          status: 'PENDING',
          items: {
            create: cart.map((item: any) => ({
              productId: item.product.id,
              quantity: item.quantity,
              unitPrice: item.product.price,
            })),
          },
        },
      });
    } catch (dbError) {
      console.warn('MySQL order record notice:', dbError);
    }

    // Generate Midtrans Payment Gateway Token
    const midtransRes = await createMidtransTransaction(orderNumber, subtotal, cart, orderDetails);

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: savedOrder?.id || orderNumber,
      token: midtransRes.token,
      redirectUrl: midtransRes.redirect_url,
      grandTotal,
    });
  } catch (error) {
    console.error('Midtrans payment creation error:', error);
    return NextResponse.json({ success: false, error: 'Gagal memproses pembayaran Midtrans' }, { status: 500 });
  }
}
