import { useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/Products";
import { CATEGORIES, PRODUCTS, CategorySlug } from "@/data/products";
import { Search, SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const Shop = () => {
  const { category } = useParams<{ category?: string }>();
  const [params] = useSearchParams();
  const initialQ = params.get("q") || "";

  const cat = CATEGORIES.find((c) => c.slug === category);
  const [q, setQ] = useState(initialQ);
  const [priceMax, setPriceMax] = useState(10000);
  const [organic, setOrganic] = useState(false);
  const [halal, setHalal] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");

  const list = useMemo(() => {
    const filtered = PRODUCTS.filter((p) => {
      if (cat && p.category !== cat.slug) return false;
      if (q && !`${p.name} ${p.origin} ${p.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (p.price > priceMax) return false;
      if (organic && !p.organic) return false;
      if (halal && !p.halal) return false;
      return true;
    });
    const sorted = [...filtered];
    switch (sort) {
      case "price-asc": sorted.sort((a, b) => a.price - b.price); break;
      case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
      case "rating": sorted.sort((a, b) => b.rating - a.rating); break;
      case "newest": sorted.reverse(); break;
    }
    return sorted;
  }, [cat, q, priceMax, organic, halal, sort]);

  const title = cat ? cat.title : "All Products";
  const emoji = cat ? cat.emoji : "🛒";

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="gradient-warm border-b border-border">
        <div className="container py-12">
          <nav className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            {cat && <><span className="mx-2">/</span><span className="text-foreground">{cat.title}</span></>}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{emoji}</span>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-700 text-primary">{title}</h1>
              <p className="text-muted-foreground mt-1">{cat?.desc || "Fresh, organic Nigerian groceries"}</p>
            </div>
          </div>

          {/* Category pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/shop" className={`px-4 py-2 rounded-full text-sm font-semibold border ${!cat ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:border-primary"}`}>
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`/shop/${c.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold border ${cat?.slug === c.slug ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:border-primary"}`}
              >
                {c.emoji} {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Filters */}
          <aside className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold mb-2">
                <Search className="w-4 h-4" /> Search
              </label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search this catalog..."
                className="w-full h-11 px-4 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 text-sm font-bold mb-4">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </div>

              <div className="mb-5">
                <div className="text-xs font-semibold text-muted-foreground mb-2">Max price: ₦{priceMax.toLocaleString()}</div>
                <Slider value={[priceMax]} min={500} max={10000} step={250} onValueChange={(v) => setPriceMax(v[0])} />
              </div>

              <label className="flex items-center gap-3 py-2 cursor-pointer">
                <Checkbox checked={organic} onCheckedChange={(v) => setOrganic(!!v)} />
                <span className="text-sm">🌱 Organic only</span>
              </label>
              <label className="flex items-center gap-3 py-2 cursor-pointer">
                <Checkbox checked={halal} onCheckedChange={(v) => setHalal(!!v)} />
                <span className="text-sm">✅ Halal certified</span>
              </label>

              <button
                onClick={() => { setQ(""); setPriceMax(10000); setOrganic(false); setHalal(false); }}
                className="mt-4 text-xs text-muted-foreground hover:text-primary underline"
              >
                Reset filters
              </button>
            </div>
          </aside>

          <div>
            <div className="mb-5 text-sm text-muted-foreground">
              Showing <strong className="text-foreground">{list.length}</strong> product{list.length !== 1 && "s"}
            </div>
            {list.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                No products match your filters.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {list.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Shop;

// Validate route param at runtime — supports /shop and /shop/:category
export const isValidCategory = (slug?: string): slug is CategorySlug =>
  CATEGORIES.some((c) => c.slug === slug);
