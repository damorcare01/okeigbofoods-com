import { Play, MapPin } from "lucide-react";
import farmer from "@/assets/farmer-harvest.jpg";
import yams from "@/assets/yams.jpg";
import cattle from "@/assets/cattle.jpg";

/**
 * Real farm video clips (Pexels free CDN).
 * Each card auto-plays a muted looping clip on hover/in-view giving the section a lively feel.
 */
const videos = [
  {
    title: "Organic Yam Cultivation",
    location: "Benue State",
    duration: "8:24",
    poster: yams,
    src: "https://videos.pexels.com/video-files/2933375/2933375-uhd_2560_1440_24fps.mp4",
    desc: "Watch our partner farmers in Benue cultivate premium organic yam the traditional way.",
  },
  {
    title: "Fresh Vegetable Farm Tour",
    location: "Lagos",
    duration: "12:05",
    poster: farmer,
    src: "https://videos.pexels.com/video-files/2098989/2098989-uhd_2560_1440_30fps.mp4",
    desc: "A full tour of our certified organic vegetable farm supplying Lagos daily.",
  },
  {
    title: "Halal Cattle Farm",
    location: "Kaduna",
    duration: "6:48",
    poster: cattle,
    src: "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
    desc: "See how our halal-certified cattle are raised with care and traditional methods.",
  },
];

export const Farms = () => (
  <section id="farms" className="py-20 bg-foreground text-background relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.06] bg-grain" />
    <div className="container relative">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold tracking-[0.25em] uppercase text-sun">From Our Farms</span>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-700">
          See Where Your Food <span className="italic font-400 text-gradient-amber">Comes From</span> 🌱
        </h2>
        <p className="mt-4 text-background/70">
          Real videos of our partner farmers growing your organic groceries — captured on the land, not in a studio.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((v) => (
          <article key={v.title} className="group rounded-3xl overflow-hidden bg-background/5 border border-background/10 hover:border-sun/40 transition-colors">
            <div className="relative aspect-video overflow-hidden">
              <video
                muted loop playsInline
                preload="metadata"
                poster={v.poster}
                onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              >
                <source src={v.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" /> FARM FOOTAGE
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/15 backdrop-blur text-[11px] font-mono">
                {v.duration}
              </div>

              <button aria-label={`Play ${v.title}`}
                      className="absolute inset-0 m-auto w-16 h-16 grid place-items-center rounded-full gradient-amber text-accent-foreground shadow-warm group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-current" />
              </button>
            </div>
            <div className="p-5">
              <div className="inline-flex items-center gap-1.5 text-xs text-sun font-semibold">
                <MapPin className="w-3 h-3" /> {v.location}
              </div>
              <h3 className="mt-1.5 font-display text-xl font-700">{v.title}</h3>
              <p className="mt-2 text-sm text-background/70 leading-relaxed">{v.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
