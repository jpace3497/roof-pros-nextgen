import { Star, Quote } from "lucide-react";
import { useEffect, useRef } from "react";

const reviews = [
  {
    name: "Sarah M████████",
    text: "PeakRoof replaced our entire roof in just two days. The crew was professional, clean, and the quality is outstanding. Highly recommend to anyone in the area.",
    rating: 5,
    location: "Mason, OH",
    service: "Roof Replacement",
  },
  {
    name: "James K████",
    text: "After a bad storm took out half our shingles, they were out the next morning. Insurance claim handled seamlessly, and our new roof looks incredible.",
    rating: 5,
    location: "West Chester, OH",
    service: "Storm Damage",
  },
  {
    name: "Maria L██████",
    text: "Got three quotes and PeakRoof was the most thorough and fairly priced. The inspection report was detailed and they answered every single question we had.",
    rating: 5,
    location: "Fairfield, OH",
    service: "Roof Inspection",
  },
  {
    name: "Robert T████████",
    text: "Our 30-year-old roof was leaking in three spots. They found the source in minutes, patched everything, and it's been bone dry through two storms since.",
    rating: 5,
    location: "Liberty Twp, OH",
    service: "Roof Repair",
  },
  {
    name: "Linda W██████",
    text: "The gutters they installed are seamless and perfectly matched to our home. Water drains exactly where it should now. Should have done this years ago.",
    rating: 5,
    location: "Hamilton, OH",
    service: "Gutter Installation",
  },
  {
    name: "David P████",
    text: "Emergency call at 10pm after a tree branch punched through our roof. A crew was there within the hour with a tarp and had it fully repaired by noon the next day.",
    rating: 5,
    location: "Springboro, OH",
    service: "Emergency Repair",
  },
  {
    name: "Jennifer A██████████",
    text: "We're a property management company and use PeakRoof for all our buildings. Consistent quality, fair pricing, and they always show up on time. Top tier.",
    rating: 5,
    location: "Cincinnati, OH",
    service: "Commercial Roofing",
  },
  {
    name: "Michael H████████",
    text: "Had them do a full tear-off and re-roof with architectural shingles. Neighbors keep asking who did our roof. That says everything right there.",
    rating: 5,
    location: "Loveland, OH",
    service: "Roof Replacement",
  },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="flex-shrink-0 w-[380px] bg-card rounded-2xl p-8 shadow-card border border-border/50 mx-3">
    <div className="flex items-center justify-between mb-5">
      <div className="flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>
      <Quote className="w-8 h-8 text-gold/20" />
    </div>
    <p className="text-foreground/80 leading-relaxed mb-6 text-sm">"{review.text}"</p>
    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
      <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center">
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
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const speed1 = 0.5;
    const speed2 = 0.35;
    let pos1 = 0;
    let pos2 = 0;
    let raf: number;

    const animate = () => {
      const el1 = scrollRef1.current;
      const el2 = scrollRef2.current;
      if (el1) {
        pos1 += speed1;
        if (pos1 >= el1.scrollWidth / 2) pos1 = 0;
        el1.scrollLeft = pos1;
      }
      if (el2) {
        pos2 += speed2;
        if (pos2 >= el2.scrollWidth / 2) pos2 = 0;
        el2.scrollLeft = pos2;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const row1 = reviews.slice(0, 4);
  const row2 = reviews.slice(4);

  return (
    <section id="reviews" className="py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-14">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">Real feedback from real homeowners across the region.</p>
        </div>
      </div>

      <div
        ref={scrollRef1}
        className="flex overflow-hidden mb-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {[...row1, ...row1, ...row1].map((r, i) => (
          <ReviewCard key={`r1-${i}`} review={r} />
        ))}
      </div>

      <div
        ref={scrollRef2}
        className="flex overflow-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {[...row2, ...row2, ...row2].map((r, i) => (
          <ReviewCard key={`r2-${i}`} review={r} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
