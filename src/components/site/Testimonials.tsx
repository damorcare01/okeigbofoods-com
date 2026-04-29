import { Quote, Star } from "lucide-react";

const reviews = [
  { name: "Amaka O.", city: "Lagos, Nigeria", text: "I ordered fresh ugu leaves at 9AM and they were at my door by 2PM! So fresh, like I went to the market myself. OkeigboFoods is a game changer!" },
  { name: "Emeka N.", city: "Abuja, Nigeria", text: "Finally, proper organic garri and ofada rice delivered to my house. The quality is amazing and it's all certified organic. Will never go back to supermarkets." },
  { name: "Fatima B.", city: "Kano, Nigeria", text: "The suya spice blend is authentic and the crayfish is fresh! Even in Kano we got same-day delivery. Absolutely love this service." },
  { name: "Chidinma A.", city: "Enugu, Nigeria", text: "Best palm oil I have ever bought online. Pure, unrefined, and smells exactly like the ones from the village. The packaging is also very professional." },
];

export const Testimonials = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-leaf">Real Reviews</span>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl font-700 text-primary">
          Trusted by <span className="italic font-400 text-gradient-amber">50,000+</span> Nigerians
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((r, i) => (
          <article key={r.name}
                   className={`relative p-7 rounded-3xl border border-border shadow-soft ${i % 2 ? "bg-secondary/60" : "bg-card"}`}>
            <Quote className="absolute top-5 right-5 w-10 h-10 text-primary/10" />
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-sun text-sun" />)}
            </div>
            <p className="font-display text-lg text-foreground leading-relaxed">"{r.text}"</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-full gradient-leaf text-primary-foreground font-display font-700">
                {r.name[0]}
              </span>
              <div>
                <div className="font-display font-700 text-foreground">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.city}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
