import { Tag, Clock, ArrowRight } from "lucide-react";

const offers = [
  { discount: "20% OFF", title: "20% Off Fresh Vegetables", desc: "All organic vegetables this week only — farm-fresh, delivered same day.", code: "VEGGIE20", time: "15d 12h left", tone: "leaf" },
  { discount: "15% OFF", title: "Halal Meat Weekend Deal", desc: "15% off all halal-certified meat and poultry this weekend.", code: "HALAL15", time: "5d 12h left", tone: "amber" },
  { discount: "FREE", title: "Free Delivery on Dairy", desc: "Get free delivery when you order any dairy products today.", code: "DAIRYFREE", time: "10d 12h left", tone: "dark" },
];

const cardClass = (t: string) => {
  if (t === "leaf") return "gradient-leaf text-primary-foreground";
  if (t === "amber") return "gradient-amber text-accent-foreground";
  return "bg-foreground text-background";
};

export const Offers = () => (
  <section id="offers" className="py-20 bg-background">
    <div className="container">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-accent">
            <Tag className="w-3.5 h-3.5" /> Limited Time
          </span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-700 text-primary">
            Today's Offers <span className="ml-1">🔥</span>
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {offers.map((o, i) => (
          <article key={o.title}
                   className={`relative overflow-hidden rounded-3xl p-7 shadow-organic ${cardClass(o.tone)} group hover:-translate-y-1 transition-transform`}>
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-background/15 group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-16 -left-10 w-44 h-44 rounded-full bg-background/10" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/20 backdrop-blur text-xs font-bold">
                <Tag className="w-3 h-3" /> {o.discount}
              </span>
              <h3 className="mt-4 font-display text-2xl font-700 leading-tight">{o.title}</h3>
              <p className="mt-2 text-sm opacity-90">{o.desc}</p>

              <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-background/15 backdrop-blur border border-background/20 font-mono text-sm tracking-wider">
                Use code <strong>{o.code}</strong>
              </div>

              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 opacity-90"><Clock className="w-4 h-4" /> {o.time}</span>
                <a href="#shop" className="inline-flex items-center gap-1.5 font-semibold hover:gap-2.5 transition-all">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
