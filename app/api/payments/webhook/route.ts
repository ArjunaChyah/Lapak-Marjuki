import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order_id, transaction_status, fraud_status } = body;

    if (!order_id) {
      return NextResponse.json({ success: false, error: 'order_id is required' }, { status: 400 });
    }

    let orderStatus: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' = 'PENDING';

    if (transaction_status === 'capture') {
      if (fraud_status === 'challenge') {
        orderStatus = 'PENDING';
      } else if (fraud_status === 'accept') {
        orderStatus = 'CONFIRMED';
      }
    } else if (transaction_status === 'settlement') {
      orderStatus = 'CONFIRMED';
    } else if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
      orderStatus = 'CANCELLED';
    } else if (transaction_status === 'pending') {
      orderStatus = 'PENDING';
    }

    try {
      await prisma.order.update({
        where: { orderNumber: order_id },
        data: { status: orderStatus },
      });
    } catch (dbErr) {
      console.warn('MySQL order status update notice:', dbErr);
    }

    return NextResponse.json({ success: true, order_id, status: orderStatus });
  } catch (error) {
    console.error('Midtrans Webhook notification error:', error);
    return NextResponse.json({ success: false, error: 'Webhook processing failed' }, { status: 500 });
  }
}
