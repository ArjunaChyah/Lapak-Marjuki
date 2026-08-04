import { BaseService } from './BaseService';
import { CartItem, OrderDetails } from '@/lib/types';
import { STORE_CONFIG } from '@/lib/config';

/**
 * OOP Class for Order management, WhatsApp payload formatting, and invoice generation.
 * Inherits from BaseService.
 */
export class OrderService extends BaseService {
  private cart: CartItem[];
  private orderDetails: OrderDetails;

  constructor(cart: CartItem[], orderDetails: OrderDetails) {
    super('OrderService');
    this.cart = cart;
    this.orderDetails = orderDetails;
  }

  public override validate(): boolean {
    return (
      Array.isArray(this.cart) &&
      this.cart.length > 0 &&
      Boolean(this.orderDetails.fullName?.trim()) &&
      Boolean(this.orderDetails.phoneNumber?.trim())
    );
  }

  public generateOrderNumber(): string {
    return `WM-${Date.now().toString().slice(-6)}`;
  }

  public calculateTotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  public buildFormattedWhatsAppMessage(): string {
    const itemsText = this.cart
      .map(item => `- ${item.product.name} x${item.quantity}`)
      .join('\n');

    const totalFormatted = `Rp${this.calculateTotal().toLocaleString('id-ID')}`;
    const deliveryText = this.orderDetails.deliveryMethod === 'ambil-sendiri' ? 'Ambil Sendiri di Warung' : 'Diantar ke Alamat';
    const paymentText = this.orderDetails.paymentMethod === 'cash' ? 'Cash / Bayar Tunai' : this.orderDetails.paymentMethod === 'transfer' ? 'Transfer Bank' : 'QRIS';

    return `Halo ${STORE_CONFIG.name},
Saya ingin memesan:

${itemsText}

Total:
${totalFormatted}

Metode Pengiriman:
${deliveryText}

Metode Pembayaran:
${paymentText}

Nama:
${this.orderDetails.fullName}

No. Telepon / WA:
${this.orderDetails.phoneNumber}

Alamat:
${this.orderDetails.deliveryAddress || 'Ambil di tempat'}

Catatan:
${this.orderDetails.notes || '-'}`;
  }

  public generateWhatsAppUrl(): string {
    const message = this.buildFormattedWhatsAppMessage();
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}
