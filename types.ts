export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  ON_HOLD = 'on-hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  FAILED = 'failed'
}

export type StockStatus = 'instock' | 'outofstock' | 'onbackorder';

export interface Address {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface LineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  subtotal: string;
  total: string;
  sku: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  status: 'publish' | 'draft' | 'private';
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_quantity: number | null;
  stock_status: StockStatus;
  manage_stock: boolean;
  images: { id: number; src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  date_created: string;
}

export interface Order {
  id: number;
  order_key: string;
  status: OrderStatus;
  currency: string;
  date_created: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  billing: Address;
  shipping: Address;
  payment_method: string;
  payment_method_title: string;
  line_items: LineItem[];
  platform: 'WooCommerce' | 'Hostcom'; // For migration tracking
  customerName: string; // Helper for display
  items_count: number;
}

export interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  date_created: string;
  orders_count: number;
  total_spent: string;
  avatar_url: string;
  billing: Address;
}

export interface StoreStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  activeProducts: number;
  growthRate: number;
}

export interface MigrationState {
  isMigrating: boolean;
  progress: number;
  logs: string[];
  connected: boolean;
  storeUrl: string;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  active: boolean;
  icon: string; // name of Lucide icon or url
  category: string;
}

export interface Theme {
  id: string;
  name: string;
  author: string;
  version: string;
  active: boolean;
  thumbnail: string;
}