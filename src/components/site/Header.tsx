import { ShoppingBasket, MapPin, User, Menu, Leaf } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Shop All", href: "#shop" },
  { label: "Vegetables", href: "#categories", emoji: "🥬" },
  { label: "Meat", href: "#categories", emoji: "🥩" },
  { label: "Grains", href: "#categories", emoji: "🌾" },
  { label: "Frozen", href: "#categories", emoji: "❄️" },
  { label: "Dairy", href: "#categories", emoji: "🥛" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      {/* Promo strip */}
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm">
        <div className="container flex items-center justify-center gap-3 py-2.5">
          <span className="inline-flex h-2 w-2 rounded-full bg-sun animate-pulse" />
          <span className="font-medium tracking-wide">
            ⚡ Same-Day Express Delivery across Nigeria — Order before 12PM
          </span>
        </div>
      </div>

      <div className="bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="grid place-items-center w-10 h-10 rounded-2xl gradient-leaf text-primary-foreground shadow-organic group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-700 text-primary">OkeigboFoods</span>
              <span className="block text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                Fresh · Pure · Nigerian
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                 className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group">
                {l.emoji && <span className="mr-1.5">{l.emoji}</span>}
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              <MapPin className="w-4 h-4" /> Track
            </button>
            <button className="hidden md:grid place-items-center w-9 h-9 rounded-full border border-border hover:border-primary transition-colors">
              <User className="w-4 h-4" />
            </button>
            <button className="relative grid place-items-center w-11 h-11 rounded-full gradient-leaf text-primary-foreground shadow-organic hover:scale-105 transition-transform">
              <ShoppingBasket className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 grid place-items-center min-w-[20px] h-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                3
              </span>
            </button>
            <button onClick={() => setOpen(!open)} className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-border">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="container py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.label} href={l.href} className="text-sm font-medium py-1.5">
                  {l.emoji && <span className="mr-2">{l.emoji}</span>}{l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
