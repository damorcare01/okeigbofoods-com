import { Link } from "react-router-dom";
import { CATEGORIES } from "@/data/products";

export const Categories = () => (
  <section id="categories" className="py-20 gradient-warm">
    <div className="container">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-leaf">Browse by Category</span>
        <h2 className="mt-2 font-display text-4xl sm:text-5xl font-700 text-primary">
          Everything Fresh,<br/>
          <span className="italic font-400 text-gradient-amber">Everything Nigerian</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to={`/shop/${c.slug}`}
            className="group relative overflow-hidden rounded-3xl bg-card p-7 border border-border hover:border-primary/40 hover:shadow-organic transition-all hover:-translate-y-1"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform inline-block">{c.emoji}</div>
            <div className="font-display font-700 text-xl text-foreground">{c.title}</div>
            <div className="text-xs text-muted-foreground mt-1.5">{c.desc}</div>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
              Shop now →
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  </section>
);
