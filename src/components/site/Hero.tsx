import { ArrowRight, Sparkles, Truck, BadgeCheck, Clock, PlayCircle } from "lucide-react";
import heroMarket from "@/assets/hero-market.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-grain">
      {/* Background autoplay video — Nigerian / African farming footage from Pexels CDN */}
      <div className="absolute inset-0">
        <video
          autoPlay muted loop playsInline
          poster={heroMarket}
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/2098989/2098989-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-12 gap-10 items-center pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="lg:col-span-7 text-primary-foreground animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/25 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-sun" />
            Same-Day Delivery Across Nigeria 🇳🇬
          </span>

          <h1 className="mt-6 font-display font-700 text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
            Pure. Organic. <br />
            <span className="italic font-400 text-sun">Farm-Fresh,</span><br />
            Delivered Fast.
          </h1>

          <p className="mt-6 text-lg max-w-xl text-primary-foreground/85 leading-relaxed">
            Shop 100% organic Nigerian groceries — from Benue yam to Lagos market spices —
            and get express same-day delivery to your doorstep.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#shop"
               className="group inline-flex items-center gap-2 px-7 py-4 rounded-full gradient-amber text-accent-foreground font-semibold shadow-warm hover:shadow-organic transition-all hover:-translate-y-0.5">
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#farms"
               className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/25 transition-colors">
              <PlayCircle className="w-5 h-5" />
              Watch Our Farmers
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-primary-foreground/90">
            <span className="inline-flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-sun" /> 100% Organic</span>
            <span className="inline-flex items-center gap-2"><Truck className="w-4 h-4 text-sun" /> Free Delivery over ₦10k</span>
            <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-sun" /> Order by 12PM Today</span>
          </div>
        </div>

        {/* Floating organic card */}
        <div className="lg:col-span-5 relative animate-fade-up [animation-delay:200ms]">
          <div className="relative leaf-mask overflow-hidden shadow-organic ring-1 ring-primary-foreground/20 animate-float">
            <img src={heroMarket} alt="Nigerian organic market produce" className="w-full h-[460px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur text-xs font-semibold text-primary">
              Nigerian Grocery Store
            </div>
          </div>

          <div className="absolute -top-4 -right-2 px-4 py-3 rounded-2xl bg-card shadow-organic flex items-center gap-3 border border-border">
            <span className="grid place-items-center w-9 h-9 rounded-full gradient-leaf text-primary-foreground">
              <BadgeCheck className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-foreground">100% Organic</div>
              <div className="text-[10px] text-muted-foreground">Certified Natural</div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 px-4 py-3 rounded-2xl bg-card shadow-warm flex items-center gap-3 border border-border">
            <span className="relative grid place-items-center w-9 h-9 rounded-full gradient-amber text-accent-foreground">
              <Truck className="w-4 h-4" />
              <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
            </span>
            <div>
              <div className="text-xs font-bold text-foreground">Express Delivery</div>
              <div className="text-[10px] text-muted-foreground">Arrives Today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
