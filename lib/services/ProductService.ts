import { BaseService } from './BaseService';
import { Product, ProductCategory } from '@/lib/types';
import { PRODUCTS as FALLBACK_PRODUCTS } from '@/lib/config';

/**
 * ProductService class demonstrating OOP Inheritance, Encapsulation, and Data Manipulation methods.
 */
export class ProductService extends BaseService {
  private products: Product[];

  constructor(initialProducts: Product[] = FALLBACK_PRODUCTS) {
    super('ProductService');
    this.products = initialProducts;
  }

  public override validate(): boolean {
    return Array.isArray(this.products) && this.products.length > 0;
  }

  public getAllProducts(): Product[] {
    return [...this.products];
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  public filterByCategory(category: ProductCategory): Product[] {
    if (category === 'semua') return this.getAllProducts();
    return this.products.filter(p => p.category === category);
  }

  public searchProducts(query: string): Product[] {
    if (!query.trim()) return this.getAllProducts();
    const q = query.toLowerCase().trim();
    return this.products.filter(
      p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  public getBestSellers(): Product[] {
    return this.products.filter(p => p.isBestSeller);
  }

  public getFeaturedProducts(): Product[] {
    return this.products.filter(p => p.isFeatured);
  }

  public sortByPrice(ascending: boolean = true): Product[] {
    return [...this.products].sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
  }
}
