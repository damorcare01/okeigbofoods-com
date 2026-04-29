import { Gift, Share2, ShoppingBag, Sparkles } from "lucide-react";
import farmer from "@/assets/farmer-harvest.jpg";

const steps = [
  { icon: Share2, title: "Share Your Code", desc: "Share your unique referral link with friends & family." },
  { icon: ShoppingBag, title: "They Shop", desc: "Your friend signs up and places their first order." },
  { icon: Sparkles, title: "Both Earn 5% Off", desc: "You both get 5% off on your next 3 orders!" },
];

export const Refer = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <div className="leaf-mask overflow-hidden shadow-organic">
            <img src={farmer} alt="Nigerian farmer harvesting greens" loading="lazy"
                 className="w-full h-[480px] object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-2 px-5 py-4 rounded-2xl gradient-amber text-accent-foreground shadow-warm flex items-center gap-3">
            <Gift className="w-6 h-6" />
            <div>
              <div className="font-display font-700 text-lg leading-tight">5% Off × 3</div>
              <div className="text-xs opacity-90">For both of you</div>
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Refer & Earn</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-700 text-primary">
            Share the Freshness, <br />
            <span className="italic font-400 text-gradient-leaf">Earn 5% Off!</span> 🎉
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
            Refer a friend to OkeigboFoods and you <strong>both</strong> get 5% discount on your next <strong>3 orders</strong> each — every time a referral is successful.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative p-5 rounded-2xl bg-secondary/60 border border-border">
                <span className="absolute -top-3 -left-3 grid place-items-center w-8 h-8 rounded-full gradient-leaf text-primary-foreground font-display font-700">
                  {i + 1}
                </span>
                <s.icon className="w-5 h-5 text-primary mb-2" />
                <div className="font-display font-700 text-foreground">{s.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              </div>
            ))}
          </div>

          <a href="#" className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full gradient-leaf text-primary-foreground font-semibold shadow-organic hover:-translate-y-0.5 transition-transform">
            Get My Referral Code
          </a>
        </div>
      </div>
    </div>
  </section>
);
