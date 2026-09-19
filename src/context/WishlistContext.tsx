import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

const STORAGE_KEY = 'digitx-wishlist';

interface WishlistContextValue {
  ids: string[];
  isSaved: (productId: string) => boolean;
  toggle: (productId: string) => boolean;
  remove: (productId: string) => void;
  clear: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function readWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(readWishlist);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore storage failures (private mode / quota)
    }
  }, [ids]);

  const value = useMemo<WishlistContextValue>(() => {
    const isSaved = (productId: string) => ids.includes(productId);

    return {
      ids,
      isSaved,
      // Returns the state after toggling: true if the product is now saved.
      toggle: (productId: string) => {
        const nowSaved = !ids.includes(productId);
        setIds((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        );
        return nowSaved;
      },
      remove: (productId: string) => setIds((prev) => prev.filter((id) => id !== productId)),
      clear: () => setIds([]),
      count: ids.length,
    };
  }, [ids]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
}
