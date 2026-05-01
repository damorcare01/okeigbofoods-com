import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getProduct, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatNGN } from "@/lib/format";
import { ProductCard } from "@/components/site/Products";
import { Star, MapPin, Truck, ShieldCheck, Leaf } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container py-32 text-center">
          <h1 className="font-display text-3xl">Product not found</h1>
          <Link to="/shop" className="mt-4 inline-block text-primary underline">Back to shop</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="container py-10">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/shop/${product.category}`} className="hover:text-primary capitalize">{product.category.replace("-", " ")}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="rounded-3xl overflow-hidden border border-border bg-card">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover aspect-square" />
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-leaf/15 text-leaf">
                  {t.toUpperCase()}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-700 text-primary leading-tight">{product.name}</h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {product.origin}</span>
              <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 fill-sun text-sun" /> {product.rating}</span>
            </div>

            <p className="mt-5 text-foreground/80 leading-relaxed">{product.description}</p>

            <div className="mt-6 flex items-end gap-3">
              <div className="font-display font-700 text-4xl text-primary">{formatNGN(product.price)}</div>
              <div className="text-sm text-muted-foreground pb-1">/ {product.unit}</div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-border rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 grid place-items-center">−</button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 grid place-items-center">+</button>
              </div>
              <button
                onClick={() => { add(product, qty); toast.success(`${qty} × ${product.name} added`); }}
                className="flex-1 h-12 rounded-full gradient-leaf text-primary-foreground font-semibold hover:shadow-organic transition-shadow"
              >
                Add to Basket
              </button>
              <button
                onClick={() => { add(product, qty); navigate("/checkout"); }}
                className="h-12 px-6 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground"
              >
                Buy now
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
              {[
                { icon: Truck, label: "Same-day delivery" },
                { icon: Leaf, label: product.organic ? "100% organic" : "Farm fresh" },
                { icon: ShieldCheck, label: product.halal ? "Halal certified" : "Quality checked" },
              ].map((b) => (
                <div key={b.label} className="p-3 rounded-2xl border border-border bg-card text-center">
                  <b.icon className="w-5 h-5 mx-auto text-primary mb-1.5" />
                  <div className="font-medium">{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-700 text-primary mb-6">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default ProductPage;
