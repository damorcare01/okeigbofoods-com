import { Link } from "react-router-dom";
import { Leaf, Instagram, Facebook, Twitter, Lock } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-16 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-10 h-10 rounded-2xl bg-primary-foreground/10 text-sun">
            <Leaf className="w-5 h-5" />
          </span>
          <span>
            <span className="block font-display text-xl font-700">OkeigboFoods</span>
            <span className="block text-[10px] tracking-[0.22em] uppercase opacity-70">Fresh · Pure · Nigerian</span>
          </span>
        </div>
        <p className="mt-5 max-w-md text-primary-foreground/75 leading-relaxed">
          100% organic Nigerian groceries delivered same-day to all 36 states. Sourced direct from
          partner farmers in Benue, Kaduna, Lagos and beyond.
        </p>
        <div className="mt-6 flex gap-3">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="grid place-items-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-sun hover:text-primary transition-colors">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <div className="font-display font-700 mb-4">Shop</div>
        <ul className="space-y-2 text-sm text-primary-foreground/75">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link to={`/shop/${c.slug}`} className="hover:text-sun">{c.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="font-display font-700 mb-4">Account</div>
        <ul className="space-y-2 text-sm text-primary-foreground/75">
          <li><Link to="/login" className="hover:text-sun">Sign in</Link></li>
          <li><Link to="/signup" className="hover:text-sun">Create account</Link></li>
          <li><Link to="/account" className="hover:text-sun">My orders</Link></li>
          <li>
            <Link to="/admin" className="hover:text-sun inline-flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Admin
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-primary-foreground/15">
      <div className="container py-5 flex flex-wrap justify-between gap-3 text-xs text-primary-foreground/60">
        <span>© {new Date().getFullYear()} OkeigboFoods. All rights reserved.</span>
        <span>Made with 🌿 in Nigeria</span>
      </div>
    </div>
  </footer>
);
