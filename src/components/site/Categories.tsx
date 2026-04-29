const categories = [
  { emoji: "🥬", title: "Fresh Vegetables", desc: "Ugu, spinach, okra & more" },
  { emoji: "🍎", title: "Fresh Fruits", desc: "Mango, pawpaw, banana" },
  { emoji: "🥛", title: "Dairy", desc: "Fresh milk, yogurt, cheese" },
  { emoji: "🥩", title: "Meat & Poultry", desc: "Halal beef, chicken, goat", badge: "HALAL" },
  { emoji: "🌾", title: "Grains & Cereals", desc: "Ofada rice, millet, sorghum" },
  { emoji: "❄️", title: "Frozen", desc: "Frozen fish, veg & meals" },
  { emoji: "🫘", title: "Dry Goods", desc: "Egusi, garri, beans" },
  { emoji: "🌶️", title: "Spices & Herbs", desc: "Uziza, ehuru, crayfish" },
  { emoji: "🫙", title: "Oils & Condiments", desc: "Palm oil, groundnut oil" },
  { emoji: "🥜", title: "Nuts & Seeds", desc: "Tiger nuts, kola nuts" },
  { emoji: "🍵", title: "Beverages", desc: "Zobo, kunu, herbal teas" },
  { emoji: "🍘", title: "Snacks", desc: "Chin chin, puff puff" },
];

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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c, i) => (
          <a key={c.title} href="#shop"
             className="group relative overflow-hidden rounded-2xl bg-card p-6 border border-border hover:border-primary/40 hover:shadow-organic transition-all hover:-translate-y-1">
            {c.badge && (
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold tracking-wider">
                {c.badge}
              </span>
            )}
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform inline-block">{c.emoji}</div>
            <div className="font-display font-700 text-lg text-foreground">{c.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.desc}</div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  </section>
);
