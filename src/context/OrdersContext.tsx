import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { CartItem } from "./CartContext";

export type OrderStatus = "pending" | "confirmed" | "out-for-delivery" | "delivered" | "cancelled";

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  userId: string | null;
  customerEmail: string;
  items: CartItem[];
  address: Address;
  subtotal: number;
  delivery: number;
  discount?: number;
  promoCode?: string;
  total: number;
  paymentMethod: "pay-on-delivery" | "transfer";
  status: OrderStatus;
  createdAt: string;
}

interface OrdersContextValue {
  orders: Order[];
  place: (o: Omit<Order, "id" | "createdAt" | "status">) => Order;
  setStatus: (id: string, status: OrderStatus) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);
const KEY = "okeigbo:orders";

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) try { setOrders(JSON.parse(raw)); } catch {}
  }, []);

  const persist = (list: Order[]) => {
    setOrders(list);
    localStorage.setItem(KEY, JSON.stringify(list));
  };

  const place: OrdersContextValue["place"] = (o) => {
    const order: Order = {
      ...o,
      id: "OK-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    persist([order, ...orders]);
    return order;
  };

  const setStatus = (id: string, status: OrderStatus) =>
    persist(orders.map((o) => (o.id === id ? { ...o, status } : o)));

  return <OrdersContext.Provider value={{ orders, place, setStatus }}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used inside OrdersProvider");
  return ctx;
};
