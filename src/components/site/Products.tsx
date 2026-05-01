import { Link } from "react-router-dom";
import { Star, ArrowRight, MapPin } from "lucide-react";
import { Product, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatNGN } from "@/lib/format";
import { toast } from "sonner";

const tagClass = (t: string) => {
  if (t === "Organic") return "bg-leaf/15 text-leaf";
  if (t === "Bestseller") return "bg-accent/15 text-accent";
  if (t === "Halal") return "bg-primary/15 text-primary";
  return "bg-terracotta/15 text-terracotta";
};

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  return (
    <article className="group rounded-3xl overflow-hidden bg-card border border-border hover:shadow-organic transition-all hover:-translate-y-1 flex flex-col">
      <Link to={`/product/${product.id}`} className="relative aspect-[4/3] overflow-hidden block">
        <img src={product.img} alt={product.name} loading="lazy" width={768} height={768}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.tags.map((t) => (
            <span key={t} className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${tagClass(t)} backdrop-blur bg-background/80`}>
              {t.toUpperCase()}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur text-xs font-semibold">
          <Star className="w-3 h-3 fill-sun text-sun" /> {product.rating}
        </div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/product/${product.id}`} className="font-display font-700 text-lg text-foreground leading-tight hover:text-primary">
              {product.name}
            </Link>
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" /> {product.origin}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display font-700 text-xl text-primary">{formatNGN(product.price)}</div>
            <div className="text-[10px] text-muted-foreground">/ {product.unit}</div>
          </div>
        </div>
        <button
          onClick={() => { add(product); toast.success(`${product.name} added to basket`); }}
          className="mt-4 w-full py-2.5 rounded-full gradient-leaf text-primary-foreground font-semibold text-sm hover:shadow-organic transition-shadow"
        >
          Add to Basket
        </button>
      </div>
    </article>
  );
};

export const Products = () => {
  const featured = PRODUCTS.slice(0, 6);
  return (
    <section id="shop" className="py-20 bg-background">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-leaf">Handpicked For You</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-700 text-primary">
              Freshest <span className="italic font-400">Picks</span>
            </h2>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary/30 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};
