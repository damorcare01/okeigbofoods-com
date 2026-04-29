import { Truck } from "lucide-react";

const states = [
  "Lagos","Abuja","Kano","Rivers","Oyo","Anambra","Delta","Edo","Kaduna","Ogun",
  "Enugu","Imo","Kwara","Katsina","Borno","Plateau","Benue","Cross River","Abia","Akwa Ibom",
];

export const Delivery = () => (
  <section className="py-20 gradient-warm overflow-hidden">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Express Same-Day Delivery</span>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl font-700 text-primary">
          We Deliver Across <br />
          <span className="italic font-400 text-gradient-leaf">All 36 States</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Order your organic groceries before 12PM and receive them the same day — no matter where you are in Nigeria.
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden mask-fade">
          <div className="flex gap-3 animate-marquee w-max">
            {[...states, ...states].map((s, i) => (
              <span key={i} className="px-5 py-3 rounded-full bg-card border border-border font-medium text-foreground inline-flex items-center gap-2 shadow-soft whitespace-nowrap">
                <Truck className="w-3.5 h-3.5 text-leaf" /> {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        + 16 more states 🇳🇬
      </div>
    </div>
  </section>
);
