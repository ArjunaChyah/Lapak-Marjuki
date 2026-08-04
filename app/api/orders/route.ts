import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { buildWhatsAppMessage, generateWhatsAppUrl } from '@/lib/formatters';
import { DeliveryMethodEnum, PaymentMethodEnum } from '@prisma/client';

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
    const subtotal = cart.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);

    const deliveryMethod = orderDetails.deliveryMethod === 'ambil-sendiri'
      ? DeliveryMethodEnum.ambil_sendiri
      : DeliveryMethodEnum.diantar;

    const paymentMethod = orderDetails.paymentMethod === 'transfer'
      ? PaymentMethodEnum.transfer
      : orderDetails.paymentMethod === 'qris'
      ? PaymentMethodEnum.qris
      : PaymentMethodEnum.cash;

    // Save order in MySQL if DB is active
    let savedOrder = null;
    try {
      savedOrder = await prisma.order.create({
        data: {
          orderNumber,
          fullName: orderDetails.fullName,
          phoneNumber: orderDetails.phoneNumber,
          deliveryAddress: orderDetails.deliveryAddress || null,
          notes: orderDetails.notes || null,
          deliveryMethod,
          paymentMethod,
          subtotal,
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
      console.warn('MySQL order record notice (using direct payload):', dbError);
    }

    const message = buildWhatsAppMessage(cart, orderDetails);
    const waUrl = generateWhatsAppUrl(message);

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: savedOrder?.id || orderNumber,
      waUrl,
      message: 'Pesanan berhasil dibuat',
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ success: false, error: 'Gagal membuat pesanan' }, { status: 500 });
  }
}
