
export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number; // 1-10
  images: string[];
  description: string;
  features: string[];
  colors: string[]; 
  woodPaints: string[];
  piecesCount: number; 
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  governorate: string;
  currency: 'EGP' | 'USD' | 'SAR' | 'AED';
  isAdmin: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  customFabric?: string;
  customPaint?: string;
  installmentMonths?: 0 | 3 | 6;
}

export enum ShippingType {
  EXPORT = 'تصدير دولي (شركات شحن دولية)',
  DOMESTIC_PRIVATE = 'سيارة خاصة (توصيل مباشر)',
  SHARED_TRUCK = 'عربة شحن مجمعة (عن طريق شركات الشحن)'
}

export enum PaymentMethod {
  BANK_TRANSFER = 'خدمات بنكية (تحويل كامل)',
  DEPOSIT_AND_COD = 'عربون 10% والباقي عند الاستلام'
}
