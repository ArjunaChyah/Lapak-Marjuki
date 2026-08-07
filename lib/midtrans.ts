import { OrderDetails, CartItem } from '@/lib/types';
import { STORE_CONFIG } from '@/lib/config';

export interface MidtransSnapTransaction {
  token: string;
  redirect_url: string;
}

/**
 * Helper utility for Midtrans Payment Gateway Integration
 */
export async function createMidtransTransaction(
  orderNumber: string,
  subtotal: number,
  cart: CartItem[],
  orderDetails: OrderDetails
): Promise<MidtransSnapTransaction> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-demo-key';
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
  const baseUrl = isProduction
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

  const itemDetails = cart.map(item => ({
    id: item.product.id,
    price: item.product.price,
    quantity: item.quantity,
    name: item.product.name.slice(0, 50),
  }));

  // Add delivery fee if applicable
  const deliveryFee = orderDetails.deliveryMethod === 'diantar' ? 5000 : 0;
  if (deliveryFee > 0) {
    itemDetails.push({
      id: 'DELIVERY_FEE',
      price: deliveryFee,
      quantity: 1,
      name: 'Ongkos Kirim Semarang',
    });
  }

  const grossAmount = subtotal + deliveryFee;

  const payload = {
    transaction_details: {
      order_id: orderNumber,
      gross_amount: grossAmount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: orderDetails.fullName,
      phone: orderDetails.phoneNumber,
      billing_address: {
        first_name: orderDetails.fullName,
        phone: orderDetails.phoneNumber,
        address: orderDetails.deliveryAddress || 'Ambil Sendiri di Warung',
      },
      shipping_address: {
        first_name: orderDetails.fullName,
        phone: orderDetails.phoneNumber,
        address: orderDetails.deliveryAddress || 'Ambil Sendiri di Warung',
      },
    },
    item_details: itemDetails,
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/order-success?order_id=${orderNumber}`,
    },
  };

  const authHeader = Buffer.from(`${serverKey}:`).toString('base64');

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Midtrans API Sandbox notice (using mock token):', errorText);
      // Fallback mock token for development testing without live keys
      return {
        token: `MOCK_SNAP_TOKEN_${orderNumber}`,
        redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${orderNumber}`,
      };
    }

    const data = await response.json();
    return {
      token: data.token,
      redirect_url: data.redirect_url,
    };
  } catch (error) {
    console.error('Midtrans transaction error:', error);
    return {
      token: `MOCK_SNAP_TOKEN_${orderNumber}`,
      redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${orderNumber}`,
    };
  }
}
