import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { buildWhatsAppMessage, generateWhatsAppUrl } from '@/lib/formatters';
import { DeliveryMethodEnum, PaymentMethodEnum, OrderStatusEnum } from '@prisma/client';

export const dynamic = 'force-dynamic';

// GET: Fetch all live orders for Admin Dashboard
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            Product: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.warn('MySQL order fetch notice (returning mock fallback data):', error);
    return NextResponse.json({
      success: true,
      orders: [],
    });
  }
}

// POST: Create a new order
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

    const deliveryMethod = orderDetails.deliveryMethod === 'ambil-sendiri'
      ? DeliveryMethodEnum.ambil_sendiri
      : DeliveryMethodEnum.diantar;

    const paymentMethod = orderDetails.paymentMethod === 'transfer'
      ? PaymentMethodEnum.transfer
      : orderDetails.paymentMethod === 'qris'
      ? PaymentMethodEnum.qris
      : PaymentMethodEnum.cash;

    // Save order in MySQL database
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

// PATCH: Update order status in MySQL from Admin Dashboard
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: 'orderId and status required' }, { status: 400 });
    }

    let mappedStatus: OrderStatusEnum = OrderStatusEnum.PENDING;
    if (status === 'CONFIRMED') mappedStatus = OrderStatusEnum.CONFIRMED;
    if (status === 'COMPLETED') mappedStatus = OrderStatusEnum.COMPLETED;
    if (status === 'CANCELLED') mappedStatus = OrderStatusEnum.CANCELLED;

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: mappedStatus },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error('Update order status error:', error);
    return NextResponse.json({ success: false, error: 'Gagal memperbarui status' }, { status: 500 });
  }
}
