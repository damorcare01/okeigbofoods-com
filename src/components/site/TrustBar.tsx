import { Zap, MapPin, Leaf, ShieldCheck } from "lucide-react";

const items = [
  { icon: Zap, title: "Same-Day Express", desc: "Order before 12PM, get it today", tone: "amber" },
  { icon: MapPin, title: "All 36 States", desc: "Delivery across Nigeria", tone: "terracotta" },
  { icon: Leaf, title: "100% Organic", desc: "Certified farm-fresh produce", tone: "leaf" },
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Freshness or full refund", tone: "primary" },
];

const toneClass = (t: string) => {
  switch (t) {
    case "amber": return "bg-accent/15 text-accent";
    case "terracotta": return "bg-terracotta/15 text-terracotta";
    case "leaf": return "bg-leaf/15 text-leaf";
    default: return "bg-primary/15 text-primary";
  }
};

export const TrustBar = () => (
  <section className="border-y border-border/60 bg-secondary/40">
    <div className="container py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((it) => (
        <div key={it.title} className="flex items-center gap-4">
          <span className={`grid place-items-center w-12 h-12 rounded-2xl ${toneClass(it.tone)}`}>
            <it.icon className="w-5 h-5" />
          </span>
          <div>
            <div className="font-display font-600 text-foreground">{it.title}</div>
            <div className="text-xs text-muted-foreground">{it.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
