import { Star, ArrowRight, MapPin } from "lucide-react";
import produce from "@/assets/produce-closeup.jpg";
import yams from "@/assets/yams.jpg";
import cattle from "@/assets/cattle.jpg";
import market from "@/assets/hero-market.jpg";

const products = [
  { name: "Halal Beef (Bone-In)", origin: "Kaduna State", price: "₦6,500", unit: "1kg", img: cattle, tags: ["Organic", "Bestseller"] },
  { name: "Fresh Organic Spinach", origin: "Ogun State", price: "₦650", unit: "large bunch", img: produce, tags: ["Organic", "New"] },
  { name: "Premium Benue Yam", origin: "Benue State", price: "₦3,200", unit: "tuber", img: yams, tags: ["Organic", "Bestseller"] },
  { name: "Fresh Okra", origin: "Kano State", price: "₦900", unit: "500g bag", img: produce, tags: ["Organic"] },
  { name: "Halal Whole Chicken", origin: "Oyo State", price: "₦4,500", unit: "~1.5kg", img: cattle, tags: ["New"] },
  { name: "Organic Spice Mix", origin: "Lagos", price: "₦1,800", unit: "200g jar", img: market, tags: ["Bestseller"] },
];

const tagClass = (t: string) => {
  if (t === "Organic") return "bg-leaf/15 text-leaf";
  if (t === "Bestseller") return "bg-accent/15 text-accent";
  return "bg-terracotta/15 text-terracotta";
};

export const Products = () => (
  <section id="shop" className="py-20 bg-background">
    <div className="container">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-leaf">Handpicked For You</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-700 text-primary">
            Freshest <span className="italic font-400">Picks</span>
          </h2>
        </div>
        <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary/30 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <article key={p.name} className="group rounded-3xl overflow-hidden bg-card border border-border hover:shadow-organic transition-all hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={p.img} alt={p.name} loading="lazy"
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${tagClass(t)} backdrop-blur bg-background/80`}>
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur text-xs font-semibold">
                <Star className="w-3 h-3 fill-sun text-sun" /> 4.9
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-700 text-lg text-foreground leading-tight">{p.name}</h3>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {p.origin}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display font-700 text-xl text-primary">{p.price}</div>
                  <div className="text-[10px] text-muted-foreground">/ {p.unit}</div>
                </div>
              </div>
              <button className="mt-4 w-full py-2.5 rounded-full gradient-leaf text-primary-foreground font-semibold text-sm hover:shadow-organic transition-shadow">
                Add to Basket
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
