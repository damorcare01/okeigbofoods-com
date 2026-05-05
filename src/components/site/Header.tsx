import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBasket, MapPin, User, Menu, Leaf, LogOut, Search } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { formatNGN } from "@/lib/format";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { count, setOpen: setCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const suggestions = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.origin} ${p.tags.join(" ")} ${p.category}`.toLowerCase().includes(term)
    ).slice(0, 6);
  }, [q]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setFocused(false);
    navigate(`/shop?q=${encodeURIComponent(q.trim())}`);
  };

  const goTo = (id: string) => {
    setFocused(false);
    setQ("");
    navigate(`/product/${id}`);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm">
        <div className="container flex items-center justify-center gap-3 py-2.5">
          <span className="inline-flex h-2 w-2 rounded-full bg-sun animate-pulse" />
          <span className="font-medium tracking-wide">
            ⚡ Same-Day Express Delivery across Nigeria — Order before 12PM
          </span>
        </div>
      </div>

      <div className="bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="container flex items-center justify-between py-4 gap-4">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="grid place-items-center w-10 h-10 rounded-2xl gradient-leaf text-primary-foreground shadow-organic group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-700 text-primary">OkeigboFoods</span>
              <span className="hidden sm:block text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                Fresh · Pure · Nigerian
              </span>
            </span>
          </Link>

          <div ref={wrapRef} className="hidden md:block flex-1 max-w-md relative">
            <form onSubmit={onSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={q}
                onFocus={() => setFocused(true)}
                onChange={(e) => { setQ(e.target.value); setFocused(true); }}
                placeholder="Search yam, suya spice, halal beef..."
                className="w-full h-11 pl-11 pr-4 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </form>
            {focused && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-2xl shadow-lg overflow-hidden z-50">
                {suggestions.map((p) => (
                  <button key={p.id} type="button" onClick={() => goTo(p.id)} className="w-full flex items-center gap-3 p-3 hover:bg-muted text-left">
                    <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.category}</div>
                    </div>
                    <div className="text-sm font-display font-700 text-primary">{formatNGN(p.price)}</div>
                  </button>
                ))}
                <button type="button" onClick={(e) => onSearch(e as any)} className="w-full p-3 text-xs font-semibold text-primary hover:bg-muted border-t border-border">
                  See all results for "{q}" →
                </button>
              </div>
            )}
          </div>

          <nav className="hidden xl:flex items-center gap-5">
            <Link to="/shop" className="text-sm font-medium hover:text-primary">Shop All</Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to={`/shop/${c.slug}`} className="text-sm font-medium hover:text-primary">
                <span className="mr-1">{c.emoji}</span>{c.title.split(" ")[0]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="hidden md:grid place-items-center w-10 h-10 rounded-full border border-border hover:border-primary">
                  <User className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover">
                  <DropdownMenuLabel>
                    <div className="font-display">{user.name}</div>
                    <div className="text-xs text-muted-foreground font-normal">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/account")}>My Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { logout(); navigate("/"); }}>
                    <LogOut className="w-4 h-4 mr-2" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="hidden md:flex items-center gap-1.5 text-sm font-medium hover:text-primary">
                <User className="w-4 h-4" /> Sign in
              </Link>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="relative grid place-items-center w-11 h-11 rounded-full gradient-leaf text-primary-foreground shadow-organic hover:scale-105 transition-transform"
              aria-label="Open basket"
            >
              <ShoppingBasket className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid place-items-center min-w-[20px] h-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setOpen(!open)} className="xl:hidden grid place-items-center w-10 h-10 rounded-full border border-border">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={onSearch} className="md:hidden container pb-3 relative">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full h-11 pl-11 pr-4 rounded-full border border-border bg-card text-sm"
          />
        </form>

        {open && (
          <div className="xl:hidden border-t border-border bg-card">
            <div className="container py-4 flex flex-col gap-3">
              <Link to="/shop" onClick={() => setOpen(false)} className="text-sm font-medium py-1.5">Shop All</Link>
              {CATEGORIES.map((c) => (
                <Link key={c.slug} to={`/shop/${c.slug}`} onClick={() => setOpen(false)} className="text-sm font-medium py-1.5">
                  <span className="mr-2">{c.emoji}</span>{c.title}
                </Link>
              ))}
              {!user && <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium py-1.5">Sign in</Link>}
              {user?.role === "admin" && <Link to="/admin" onClick={() => setOpen(false)} className="text-sm font-medium py-1.5 text-accent">Admin</Link>}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
