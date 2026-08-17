export type PageRoute = 
  | 'home'
  | 'catalog'
  | 'product'
  | 'services'
  | 'about'
  | 'certificates'
  | 'news'
  | 'articles'
  | 'faq'
  | 'partners'
  | 'contacts'
  | 'cart'
  | 'checkout'
  | 'delivery';

export type ProductBadge = 'HIT' | 'NEW' | 'DISCOUNT';

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  company?: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  priceBYN: number;
  oldPriceBYN?: number;
  badge?: ProductBadge;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  additionalImages: string[];
  shortDesc: string;
  fullDesc: string;
  specs: ProductSpec[];
  tags: string[];
  warrantyMonths: number;
  reviews: Review[];
  isPopular?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  productCount: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  priceRange: [number, number];
  selectedBrands: string[];
  badges: ProductBadge[];
  onlyInStock: boolean;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  priceStartBYN: number;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
  tags: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  validUntil: string;
  image: string;
  pdfUrl?: string;
  category: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'delivery' | 'b2b' | 'warranty' | 'tech';
}

export interface PartnerBrand {
  id: string;
  name: string;
  logo: string;
  country: string;
  description: string;
  website: string;
  featuredCategory: string;
}

export interface OrderData {
  orderId: string;
  customerType: 'b2c' | 'b2b';
  fullName: string;
  phone: string;
  email: string;
  companyName?: string;
  unp?: string;
  bik?: string;
  bankAccount?: string;
  address: string;
  city: string;
  deliveryMethod: string;
  paymentMethod: string;
  comment?: string;
  items: CartItem[];
  totalBYN: number;
  discountBYN: number;
  date: string;
}
