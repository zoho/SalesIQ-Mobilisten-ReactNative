import {useEffect, useState} from 'react';

/** A Zylker catalog product. `icon` is a MaterialCommunityIcons glyph, `tint` a
 *  theme color key used for its placeholder image tile. */
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  blurb: string;
  icon: string;
  tint: 'primary' | 'secondary' | 'accent';
}

export interface Order {
  id: string;
  productId: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  placed: string;
  eta: string;
}

export const PRODUCTS: Product[] = [
  {id: 'ZY-HP1', name: 'Wireless headphones', price: 129, oldPrice: 159, rating: 4.6, reviews: 2318, blurb: 'Active noise cancellation, 30-hour battery, USB-C fast charge.', icon: 'headphones', tint: 'primary'},
  {id: 'ZY-WT2', name: 'Smart watch', price: 199, rating: 4.4, reviews: 1102, blurb: 'AMOLED display, GPS, heart-rate and SpO2 tracking, 7-day battery.', icon: 'watch', tint: 'secondary'},
  {id: 'ZY-SP3', name: 'Bluetooth speaker', price: 89, oldPrice: 99, rating: 4.7, reviews: 845, blurb: '360° sound, IP67 waterproof, 20-hour playtime.', icon: 'speaker', tint: 'accent'},
  {id: 'ZY-EB4', name: 'Wireless earbuds', price: 59, rating: 4.3, reviews: 3760, blurb: 'Compact, sweat-resistant, wireless charging case.', icon: 'earbuds', tint: 'primary'},
  {id: 'ZY-PC5', name: 'Phone case', price: 19, rating: 4.1, reviews: 512, blurb: 'Shock-absorbing bumper with a matte finish.', icon: 'cellphone', tint: 'secondary'},
  {id: 'ZY-CM6', name: 'Action camera', price: 249, oldPrice: 279, rating: 4.5, reviews: 289, blurb: '4K60 video, stabilization, waterproof to 10m.', icon: 'camera', tint: 'accent'},
];

export const ORDERS: Order[] = [
  {id: 'A-1024', productId: 'ZY-HP1', status: 'Shipped', placed: 'Jul 3', eta: 'Arriving Jul 9'},
  {id: 'A-1009', productId: 'ZY-SP3', status: 'Delivered', placed: 'Jun 21', eta: 'Delivered Jun 25'},
];

export const productById = (id: string) => PRODUCTS.find(p => p.id === id);

// ── In-memory cart (module singleton + hook) ───────────────────────────────────
export interface CartItem {
  product: Product;
  qty: number;
}

let cart: CartItem[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());

export const cartStore = {
  items: (): CartItem[] => cart,
  count: () => cart.reduce((n, i) => n + i.qty, 0),
  total: () => cart.reduce((s, i) => s + i.product.price * i.qty, 0),
  add(product: Product) {
    const existing = cart.find(i => i.product.id === product.id);
    if (existing) {
      cart = cart.map(i => (i.product.id === product.id ? {...i, qty: i.qty + 1} : i));
    } else {
      cart = [...cart, {product, qty: 1}];
    }
    emit();
  },
  remove(id: string) {
    cart = cart.filter(i => i.product.id !== id);
    emit();
  },
  clear() {
    cart = [];
    emit();
  },
};

/** Subscribe a component to cart changes; returns the shared store. */
export function useCart() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force(n => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return cartStore;
}
