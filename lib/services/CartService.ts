import { BaseService } from './BaseService';
import { CartItem, Product } from '@/lib/types';

/**
 * OOP Class for managing Shopping Cart business logic and encapsulation.
 * Inherits from BaseService.
 */
export class CartService extends BaseService {
  private items: CartItem[];

  constructor(initialItems: CartItem[] = []) {
    super('CartService');
    this.items = initialItems;
  }

  public override validate(): boolean {
    return Array.isArray(this.items);
  }

  public getItems(): CartItem[] {
    return [...this.items];
  }

  public addItem(product: Product, quantity: number = 1): CartItem[] {
    if (quantity <= 0) return this.getItems();

    const existingIndex = this.items.findIndex(i => i.product.id === product.id);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    return this.getItems();
  }

  public removeItem(productId: string): CartItem[] {
    this.items = this.items.filter(i => i.product.id !== productId);
    return this.getItems();
  }

  public updateQuantity(productId: string, quantity: number): CartItem[] {
    if (quantity <= 0) {
      return this.removeItem(productId);
    }
    const target = this.items.find(i => i.product.id === productId);
    if (target) {
      target.quantity = quantity;
    }
    return this.getItems();
  }

  public calculateSubtotal(): number {
    return this.items.reduce((sum, i) => sum + (i.product.price * i.quantity), 0);
  }

  public getTotalItems(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  public clear(): void {
    this.items = [];
  }
}
