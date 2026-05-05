import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  saved: Product[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  removeSaved: (id: string) => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "okeigbo:cart";
const SAVED_KEY = "okeigbo:saved";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [saved, setSaved] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) try { setItems(JSON.parse(raw)); } catch {}
    const s = localStorage.getItem(SAVED_KEY);
    if (s) try { setSaved(JSON.parse(s)); } catch {}
  }, []);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem(SAVED_KEY, JSON.stringify(saved)); }, [saved]);

  const add = (product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { product, qty }];
    });
    setSaved((prev) => prev.filter((p) => p.id !== product.id));
    setOpen(true);
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));
  const setQty = (id: string, qty: number) => {
    if (qty < 1) { remove(id); return; }
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty } : i)));
  };
  const clear = () => setItems([]);

  const saveForLater = (id: string) => {
    const it = items.find((i) => i.product.id === id);
    if (!it) return;
    setItems((prev) => prev.filter((i) => i.product.id !== id));
    setSaved((prev) => (prev.some((p) => p.id === id) ? prev : [...prev, it.product]));
  };
  const moveToCart = (id: string) => {
    const p = saved.find((x) => x.id === id);
    if (!p) return;
    setSaved((prev) => prev.filter((x) => x.id !== id));
    setItems((prev) => prev.some((i) => i.product.id === id) ? prev : [...prev, { product: p, qty: 1 }]);
  };
  const removeSaved = (id: string) => setSaved((prev) => prev.filter((p) => p.id !== id));

  const count = items.reduce((a, i) => a + i.qty, 0);
  const subtotal = items.reduce((a, i) => a + i.qty * i.product.price, 0);

  return (
    <CartContext.Provider value={{ items, saved, add, remove, setQty, clear, saveForLater, moveToCart, removeSaved, count, subtotal, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
