import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    text: "PeakRoof replaced our entire roof in just two days. The crew was professional, clean, and the quality is outstanding. Highly recommend!",
    rating: 5,
    initials: "SM",
  },
  {
    name: "James K.",
    text: "After a bad storm, they were out the next morning. Insurance claim handled seamlessly, and our new roof looks incredible. A+ service!",
    rating: 5,
    initials: "JK",
  },
  {
    name: "Maria L.",
    text: "Got three quotes and PeakRoof was the most thorough and fairly priced. The inspection report was detailed and they answered every question.",
    rating: 5,
    initials: "ML",
  },
];

const ReviewsSection = () => (
  <section id="reviews" className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">Testimonials</span>
        <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">What Our Customers Say</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-foreground/80 leading-relaxed mb-6">"{r.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">{r.initials}</span>
              </div>
              <span className="font-heading font-bold text-foreground">{r.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
