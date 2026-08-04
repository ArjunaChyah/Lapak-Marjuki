import { BaseService } from './BaseService';
import { STORE_CONFIG } from '@/lib/config';

export interface InquiryPayload {
  name: string;
  phone?: string;
  message: string;
}

/**
 * OOP Class for handling customer inquiries and contact messages.
 * Inherits from BaseService.
 */
export class InquiryService extends BaseService {
  private payload: InquiryPayload;

  constructor(payload: InquiryPayload) {
    super('InquiryService');
    this.payload = payload;
  }

  public override validate(): boolean {
    return Boolean(this.payload.name?.trim()) && Boolean(this.payload.message?.trim());
  }

  public buildWhatsAppInquiryUrl(): string {
    const waMsg = `Halo Ibu Yulia (${STORE_CONFIG.name}),\nSaya ${this.payload.name} (${this.payload.phone || '-'}).\n\nPesan: ${this.payload.message}`;
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
  }
}
