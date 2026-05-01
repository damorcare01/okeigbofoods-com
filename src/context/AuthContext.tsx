import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "customer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  createdAt: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextValue {
  user: User | null;
  users: User[];
  signup: (data: { name: string; email: string; password: string; phone?: string }) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  setRole: (userId: string, role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const USERS_KEY = "okeigbo:users";
const SESSION_KEY = "okeigbo:session";

const seed = (): StoredUser[] => {
  const existing = localStorage.getItem(USERS_KEY);
  if (existing) return JSON.parse(existing);
  const seeded: StoredUser[] = [
    {
      id: "admin-1",
      name: "Site Admin",
      email: "admin@okeigbofoods.ng",
      password: "admin123",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
  return seeded;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [allUsers, setAllUsers] = useState<StoredUser[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const u = seed();
    setAllUsers(u);
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      const found = u.find((x) => x.id === session);
      if (found) {
        const { password, ...safe } = found;
        setUser(safe);
      }
    }
  }, []);

  const persist = (list: StoredUser[]) => {
    setAllUsers(list);
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  };

  const signup: AuthContextValue["signup"] = ({ name, email, password, phone }) => {
    const e = email.trim().toLowerCase();
    if (allUsers.some((u) => u.email.toLowerCase() === e)) {
      return { ok: false, error: "An account with that email already exists." };
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: e,
      password,
      phone,
      role: "customer",
      createdAt: new Date().toISOString(),
    };
    persist([...allUsers, newUser]);
    const { password: _, ...safe } = newUser;
    setUser(safe);
    localStorage.setItem(SESSION_KEY, newUser.id);
    return { ok: true };
  };

  const login: AuthContextValue["login"] = (email, password) => {
    const found = allUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (!found) return { ok: false, error: "Invalid email or password." };
    const { password: _, ...safe } = found;
    setUser(safe);
    localStorage.setItem(SESSION_KEY, found.id);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const setRole = (userId: string, role: Role) => {
    const updated = allUsers.map((u) => (u.id === userId ? { ...u, role } : u));
    persist(updated);
    if (user?.id === userId) setUser({ ...user, role });
  };

  const safeUsers = allUsers.map(({ password, ...u }) => u);

  return (
    <AuthContext.Provider value={{ user, users: safeUsers, signup, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
