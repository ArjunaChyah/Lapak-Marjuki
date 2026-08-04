import { CartItem, OrderDetails } from './types';
import { STORE_CONFIG } from './config';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount).replace('Rp', 'Rp');
}

export function formatRupiahCompact(amount: number): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}

export function buildWhatsAppMessage(cart: CartItem[], orderDetails: OrderDetails): string {
  const itemsText = cart
    .map(item => `- ${item.product.name} x${item.quantity}`)
    .join('\n');

  const grandTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const deliveryText = orderDetails.deliveryMethod === 'ambil-sendiri' ? 'Ambil Sendiri di Warung' : 'Diantar ke Alamat';
  const paymentText = orderDetails.paymentMethod === 'cash' ? 'Cash / Bayar Tunai' : orderDetails.paymentMethod === 'transfer' ? 'Transfer Bank' : 'QRIS';

  return `Halo ${STORE_CONFIG.name},
Saya ingin memesan:

${itemsText}

Total:
${formatRupiahCompact(grandTotal)}

Metode Pengiriman:
${deliveryText}

Metode Pembayaran:
${paymentText}

Nama:
${orderDetails.fullName}

No. Telepon / WA:
${orderDetails.phoneNumber}

Alamat:
${orderDetails.deliveryAddress || 'Ambil di tempat'}

Catatan:
${orderDetails.notes || '-'}`;
}

export function generateWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
}
