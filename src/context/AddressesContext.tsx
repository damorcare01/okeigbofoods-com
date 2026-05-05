import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Address } from "./OrdersContext";
import { useAuth } from "./AuthContext";

export interface SavedAddress extends Address {
  id: string;
  label?: string;
}

interface AddressesContextValue {
  addresses: SavedAddress[];
  add: (a: Address & { label?: string }) => SavedAddress;
  update: (id: string, a: Address & { label?: string }) => void;
  remove: (id: string) => void;
}

const AddressesContext = createContext<AddressesContextValue | null>(null);
const keyFor = (uid: string | null) => `okeigbo:addresses:${uid || "guest"}`;

export const AddressesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const uid = user?.id || null;
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(keyFor(uid));
    setAddresses(raw ? (() => { try { return JSON.parse(raw); } catch { return []; } })() : []);
  }, [uid]);

  const persist = (list: SavedAddress[]) => {
    setAddresses(list);
    localStorage.setItem(keyFor(uid), JSON.stringify(list));
  };

  const add: AddressesContextValue["add"] = (a) => {
    const sa: SavedAddress = { ...a, id: crypto.randomUUID() };
    persist([sa, ...addresses]);
    return sa;
  };
  const update: AddressesContextValue["update"] = (id, a) =>
    persist(addresses.map((x) => (x.id === id ? { ...x, ...a } : x)));
  const remove = (id: string) => persist(addresses.filter((x) => x.id !== id));

  return (
    <AddressesContext.Provider value={{ addresses, add, update, remove }}>
      {children}
    </AddressesContext.Provider>
  );
};

export const useAddresses = () => {
  const ctx = useContext(AddressesContext);
  if (!ctx) throw new Error("useAddresses must be used inside AddressesProvider");
  return ctx;
};
