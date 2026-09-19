import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (productId: string) => CartItem | undefined;
  totalItems: number;
  subtotal: number;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'digitx-cart';
const LEGACY_KEYS = ['Digit X-cart', 'nasgas-cart'];

function isValidProduct(product: unknown): product is Product {
  if (!product || typeof product !== 'object') return false;
  const p = product as Partial<Product>;
  return (
    typeof p.id === 'string' &&
    typeof p.slug === 'string' &&
    typeof p.title === 'string' &&
    typeof p.price === 'number' &&
    Number.isFinite(p.price) &&
    Array.isArray(p.images) &&
    p.images.length > 0
  );
}

function sanitizeItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null;
      const item = entry as Partial<CartItem>;
      const quantity = Number(item.quantity);
      if (!isValidProduct(item.product) || !Number.isFinite(quantity) || quantity <= 0) {
        return null;
      }
      return {
        product: item.product,
        quantity: Math.floor(quantity),
      };
    })
    .filter((item): item is CartItem => item !== null);
}

function readCart(): CartItem[] {
  const keys = [STORAGE_KEY, ...LEGACY_KEYS];
  for (const key of keys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as unknown;
      const items = sanitizeItems(parsed);
      if (items.length > 0 || key === STORAGE_KEY) {
        if (key !== STORAGE_KEY) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
          localStorage.removeItem(key);
        }
        return items;
      }
    } catch {
      // try next key
    }
  }
  return [];
}

function writeCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors (e.g. private mode)
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    writeCart(items);
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    if (!isValidProduct(product)) return;
    const qty = Math.max(1, Math.floor(quantity));
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => setItems([]);

  const getItem = (productId: string) => items.find((i) => i.product.id === productId);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const total = subtotal;

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItem,
      totalItems,
      subtotal,
      total,
    }),
    [items, totalItems, subtotal, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
