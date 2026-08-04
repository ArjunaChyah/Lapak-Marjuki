export type ProductCategory = 'semua' | 'makanan' | 'minuman' | 'gorengan';

export interface Product {
  id: string;
  name: string;
  category: 'makanan' | 'minuman' | 'gorengan';
  price: number;
  description: string;
  image: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMethod = 'ambil-sendiri' | 'diantar';
export type PaymentMethod = 'cash' | 'transfer' | 'qris';

export interface OrderDetails {
  fullName: string;
  phoneNumber: string;
  deliveryAddress: string;
  notes?: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
}

export interface StoreConfig {
  name: string;
  owner: string;
  tagline: string;
  subtitle: string;
  address: {
    street: string;
    rtRw: string;
    city: string;
    province: string;
    country: string;
    fullAddress: string;
  };
  openingHours: string;
  phone: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
}
