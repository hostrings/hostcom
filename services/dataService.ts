import { Order, OrderStatus, Product, Customer, LineItem, StockStatus, Plugin, Theme } from "../types";

const NAMES = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Eva', 'David', 'Sarah', 'Michael', 'Emily'];
const SURNAMES = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'White', 'Wilson', 'Taylor', 'Anderson', 'Thomas'];
const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'London', 'Toronto', 'Sydney', 'Berlin'];
const COUNTRIES = ['US', 'US', 'US', 'US', 'UK', 'CA', 'AU', 'DE'];

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generate a random WooCommerce Address
const generateAddress = (firstName: string, lastName: string) => ({
  first_name: firstName,
  last_name: lastName,
  company: Math.random() > 0.8 ? 'Tech Corp' : '',
  address_1: `${Math.floor(Math.random() * 1000)} Main St`,
  address_2: Math.random() > 0.7 ? 'Apt 4B' : '',
  city: getRandom(CITIES),
  state: 'NY', // Simplified
  postcode: '10001',
  country: getRandom(COUNTRIES),
  email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
  phone: '555-0123'
});

export const generateCustomers = (count: number): Customer[] => {
  const customers: Customer[] = [];
  for (let i = 0; i < count; i++) {
    const fn = getRandom(NAMES);
    const ln = getRandom(SURNAMES);
    customers.push({
      id: 2000 + i,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
      first_name: fn,
      last_name: ln,
      username: `${fn.toLowerCase()}${i}`,
      date_created: new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString(),
      orders_count: Math.floor(Math.random() * 20),
      total_spent: (Math.random() * 2000).toFixed(2),
      avatar_url: `https://ui-avatars.com/api/?name=${fn}+${ln}&background=random`,
      billing: generateAddress(fn, ln)
    });
  }
  return customers;
};

export const generateOrders = (count: number): Order[] => {
  const orders: Order[] = [];
  
  for (let i = 0; i < count; i++) {
    const fn = getRandom(NAMES);
    const ln = getRandom(SURNAMES);
    const status = getRandom([OrderStatus.PROCESSING, OrderStatus.COMPLETED, OrderStatus.ON_HOLD, OrderStatus.CANCELLED]);
    const itemCount = Math.floor(Math.random() * 4) + 1;
    
    // Generate Line Items
    const lineItems: LineItem[] = [];
    let orderTotal = 0;
    
    for(let j=0; j<itemCount; j++) {
        const price = Math.random() * 100 + 10;
        const qty = Math.floor(Math.random() * 2) + 1;
        const subtotal = price * qty;
        orderTotal += subtotal;
        
        lineItems.push({
            id: 900 + j,
            name: `${getRandom(['Premium', 'Basic', 'Pro'])} ${getRandom(['Widget', 'Gadget', 'Tool'])}`,
            product_id: 5000 + j,
            variation_id: 0,
            quantity: qty,
            subtotal: subtotal.toFixed(2),
            total: subtotal.toFixed(2),
            sku: `WC-HK-${Math.floor(Math.random() * 1000)}`,
            image: `https://picsum.photos/100?random=${i}${j}`
        });
    }

    orders.push({
      id: 10000 + i,
      order_key: `wc_order_${Math.random().toString(36).substring(7)}`,
      status: status,
      currency: 'USD',
      date_created: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)).toISOString(),
      total: orderTotal.toFixed(2),
      total_tax: (orderTotal * 0.1).toFixed(2),
      prices_include_tax: false,
      customer_id: 2000 + i,
      customer_ip_address: '192.168.1.1',
      billing: generateAddress(fn, ln),
      shipping: generateAddress(fn, ln),
      payment_method: 'stripe',
      payment_method_title: 'Credit Card (Stripe)',
      line_items: lineItems,
      platform: Math.random() > 0.8 ? 'Hostcom' : 'WooCommerce',
      customerName: `${fn} ${ln}`,
      items_count: itemCount
    });
  }
  return orders.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
};

export const generateProducts = (count: number): Product[] => {
  const products: Product[] = [];
  const categories = ['Clothing', 'Electronics', 'Home & Garden', 'Accessories'];
  
  for (let i = 0; i < count; i++) {
    const isSale = Math.random() > 0.7;
    const price = parseFloat((Math.random() * 100 + 20).toFixed(2));
    const salePrice = (price * 0.8).toFixed(2);
    const stockStatus: StockStatus = Math.random() > 0.9 ? 'outofstock' : 'instock';

    products.push({
      id: 5000 + i,
      name: `${getRandom(['Men\'s', 'Women\'s', 'Unisex'])} ${getRandom(['T-Shirt', 'Hoodie', 'Watch', 'Bag', 'Shoes'])}`,
      slug: `product-${i}`,
      status: 'publish',
      sku: `WC-${Math.floor(Math.random() * 9999)}`,
      price: isSale ? salePrice : price.toFixed(2),
      regular_price: price.toFixed(2),
      sale_price: isSale ? salePrice : '',
      on_sale: isSale,
      stock_quantity: stockStatus === 'instock' ? Math.floor(Math.random() * 100) : 0,
      stock_status: stockStatus,
      manage_stock: true,
      images: [{ id: i, src: `https://picsum.photos/300?random=${i}`, alt: 'Product Image' }],
      categories: [{ id: 1, name: getRandom(categories), slug: 'cat' }],
      date_created: new Date().toISOString()
    });
  }
  return products;
};

export const generatePlugins = (): Plugin[] => [
    { id: '1', name: 'WooCommerce Stripe Gateway', description: 'Accept credit card payments directly on your store.', author: 'WooCommerce', version: '7.4.1', active: true, icon: 'CreditCard', category: 'Payments' },
    { id: '2', name: 'Yoast SEO', description: 'Improve your SEO and get more traffic.', author: 'Team Yoast', version: '20.1', active: true, icon: 'Search', category: 'Marketing' },
    { id: '3', name: 'WooCommerce Shipping', description: 'Print shipping labels directly from your dashboard.', author: 'WooCommerce', version: '1.2.0', active: true, icon: 'Truck', category: 'Shipping' },
    { id: '4', name: 'Jetpack', description: 'Security, performance, and marketing tools.', author: 'Automattic', version: '12.0', active: false, icon: 'Zap', category: 'Utility' },
    { id: '5', name: 'Mailchimp for WooCommerce', description: 'Marketing automation and email marketing.', author: 'Mailchimp', version: '3.7', active: false, icon: 'Mail', category: 'Marketing' },
    { id: '6', name: 'WooCommerce Subscriptions', description: 'Create and manage products with recurring payments.', author: 'WooCommerce', version: '5.1.0', active: false, icon: 'Repeat', category: 'Sales' }
];

export const generateThemes = (): Theme[] => [
    { id: 'storefront', name: 'Storefront', author: 'WooCommerce', version: '4.2.0', active: true, thumbnail: 'https://img.freepik.com/free-vector/website-setup-concept-illustration_114360-4497.jpg?w=800' },
    { id: 'astra', name: 'Astra', author: 'Brainstorm Force', version: '4.0.0', active: false, thumbnail: 'https://img.freepik.com/free-vector/web-design-production-concept-illustration_114360-1493.jpg?w=800' },
    { id: 'oceanwp', name: 'OceanWP', author: 'OceanWP', version: '3.4.1', active: false, thumbnail: 'https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg?w=800' }
];