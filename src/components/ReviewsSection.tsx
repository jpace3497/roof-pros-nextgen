import { Star, Quote, BadgeCheck } from "lucide-react";
import { useEffect, useRef } from "react";

const reviews = [
  { name: "Sarah M████████", text: "PeakRoof replaced our entire roof in just two days. The crew was professional, clean, and the quality is outstanding. Highly recommend to anyone in the area.", rating: 5, location: "Worcester, MA", service: "Roof Replacement" },
  { name: "James K████", text: "After a bad nor'easter took out half our shingles, they were out the next morning. Insurance claim handled seamlessly, and our new roof looks incredible.", rating: 5, location: "Springfield, MA", service: "Storm Damage" },
  { name: "Maria L██████", text: "Got three quotes and PeakRoof was the most thorough and fairly priced. The inspection report was detailed and they answered every single question we had.", rating: 5, location: "Cambridge, MA", service: "Roof Inspection" },
  { name: "Robert T████████", text: "Our 30-year-old roof was leaking in three spots. They found the source in minutes, patched everything, and it's been bone dry through two storms since.", rating: 5, location: "Framingham, MA", service: "Roof Repair" },
  { name: "Linda W██████", text: "The gutters they installed are seamless and perfectly matched to our home. Water drains exactly where it should now. Should have done this years ago.", rating: 5, location: "Brookline, MA", service: "Gutter Installation" },
  { name: "David P████", text: "Emergency call at 10pm after a tree branch punched through our roof. A crew was there within the hour with a tarp and had it fully repaired by noon the next day.", rating: 5, location: "Quincy, MA", service: "Emergency Repair" },
  { name: "Jennifer A██████████", text: "We're a property management company and use PeakRoof for all our buildings. Consistent quality, fair pricing, and they always show up on time. Top tier.", rating: 5, location: "Boston, MA", service: "Commercial Roofing" },
  { name: "Michael H████████", text: "Had them do a full tear-off and re-roof with architectural shingles. Neighbors keep asking who did our roof. That says everything right there.", rating: 5, location: "Newton, MA", service: "Roof Replacement" },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="flex-shrink-0 w-[380px] bg-card rounded-2xl p-8 shadow-card border border-border/50 mx-3">
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-emerald-600">
        <BadgeCheck className="w-4 h-4" />
        <span className="text-[11px] font-semibold">Verified Google Review</span>
      </div>
    </div>
    <p className="text-foreground/80 leading-relaxed mb-6 text-sm">"{review.text}"</p>
    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
      <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-xs">{review.name.charAt(0)}{review.name.split(" ")[1]?.charAt(0)}</span>
      </div>
      <div>
        <span className="font-heading font-bold text-foreground text-sm block">{review.name}</span>
        <span className="text-muted-foreground text-xs">{review.location} · {review.service}</span>
      </div>
    </div>
  </div>
);

const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    let pos = 0;
    let raf: number;

    const animate = () => {
      const el = scrollRef.current;
      if (el && !pausedRef.current) {
        pos += 0.18;
        if (pos >= el.scrollWidth / 2) pos = 0;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="reviews" className="py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-14">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">Real feedback from real homeowners across Massachusetts.</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {[...reviews, ...reviews, ...reviews].map((r, i) => (
          <ReviewCard key={`r-${i}`} review={r} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
