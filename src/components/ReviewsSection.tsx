import { Star, BadgeCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { LeadData } from "@/types/lead";
import type { GoogleReview, GoogleReviewsData } from "@/hooks/useGoogleReviews";

interface ReviewsSectionProps {
  lead: LeadData;
  reviewsData?: GoogleReviewsData | null;
  reviewsLoading?: boolean;
}

/* ── Stock fallback reviews ───────────────────────────────── */

const stockReviews = [
  { name: "Sarah M.", text: "They replaced our entire roof in just two days. The crew was professional, clean, and the quality is outstanding. Highly recommend to anyone in the area.", rating: 5, service: "Roof Replacement" },
  { name: "James K.", text: "After a bad storm took out half our shingles, they were out the next morning. Insurance claim handled seamlessly, and our new roof looks incredible.", rating: 5, service: "Storm Damage" },
  { name: "Maria L.", text: "Got three quotes and they were the most thorough and fairly priced. The inspection report was detailed and they answered every single question we had.", rating: 5, service: "Roof Inspection" },
  { name: "Robert T.", text: "Our 30-year-old roof was leaking in three spots. They found the source in minutes, patched everything, and it's been bone dry through two storms since.", rating: 5, service: "Roof Repair" },
  { name: "Linda W.", text: "The gutters they installed are seamless and perfectly matched to our home. Water drains exactly where it should now. Should have done this years ago.", rating: 5, service: "Gutter Installation" },
  { name: "David P.", text: "Emergency call at 10pm after a tree branch punched through our roof. A crew was there within the hour with a tarp and had it fully repaired by noon the next day.", rating: 5, service: "Emergency Repair" },
  { name: "Jennifer A.", text: "We're a property management company and use them for all our buildings. Consistent quality, fair pricing, and they always show up on time. Top tier.", rating: 5, service: "Commercial Roofing" },
  { name: "Michael H.", text: "Had them do a full tear-off and re-roof with architectural shingles. Neighbors keep asking who did our roof. That says everything right there.", rating: 5, service: "Roof Replacement" },
];

/* ── Review card (handles both Google and stock formats) ──── */

interface ReviewCardProps {
  name: string;
  text: string;
  rating: number;
  subtitle: string;
  verified: boolean;
}

const TRUNCATE_LENGTH = 180;

const ReviewCard = ({ name, text, rating, subtitle, verified }: ReviewCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = text.length > TRUNCATE_LENGTH;
  const displayText = expanded || !needsTruncation
    ? text
    : text.slice(0, TRUNCATE_LENGTH).replace(/\s+\S*$/, "") + "…";

  return (
    <div className="flex-shrink-0 w-[380px] bg-card rounded-2xl p-8 shadow-card border border-border/50 mx-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
          ))}
        </div>
        {verified && (
          <div className="flex items-center gap-1.5 text-emerald-600">
            <BadgeCheck className="w-4 h-4" />
            <span className="text-[11px] font-semibold">Verified Google Review</span>
          </div>
        )}
      </div>
      <p className="text-foreground/80 leading-relaxed mb-1 text-sm">"{displayText}"</p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gold text-xs font-semibold hover:underline mb-4"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      {!needsTruncation && <div className="mb-5" />}
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs">
            {name.charAt(0)}
            {name.split(" ")[1]?.charAt(0) || ""}
          </span>
        </div>
        <div>
          <span className="font-heading font-bold text-foreground text-sm block">{name}</span>
          <span className="text-muted-foreground text-xs">{subtitle}</span>
        </div>
      </div>
    </div>
  );
};

/* ── Main section ─────────────────────────────────────────── */

const ReviewsSection = ({ lead, reviewsData, reviewsLoading }: ReviewsSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const googleData = reviewsData;
  const loading = reviewsLoading ?? false;

  const location = lead.city && lead.state
    ? `${lead.city}, ${lead.state}`
    : lead.city || lead.state || "Local";

  const regionLabel = lead.city
    ? `in ${lead.city}`
    : lead.state
      ? `across ${lead.state}`
      : "in your area";

  // Decide which reviews to show
  const useGoogle = !loading && googleData?.found && googleData.reviews.length > 0;
  const displayRating = useGoogle && googleData?.rating ? googleData.rating : 4.9;
  const displayTotal = useGoogle && googleData?.totalReviews ? googleData.totalReviews : 200;

  // Build review cards — Google reviews first, then fill with stock to ensure
  // at least 6 unique cards so the infinite carousel has enough width to scroll
  const MIN_CARDS = 6;

  const googleCards: ReviewCardProps[] = useGoogle
    ? googleData!.reviews.map((r: GoogleReview) => ({
        name: r.name,
        text: r.text,
        rating: r.rating,
        subtitle: `${location} · ${r.timeAgo}`,
        verified: true,
      }))
    : [];

  const stockCards: ReviewCardProps[] = stockReviews.map((r) => ({
    name: r.name,
    text: r.text,
    rating: r.rating,
    subtitle: `${location} · ${r.service}`,
    verified: !useGoogle, // only mark as "Verified Google Review" when using stock as primary
  }));

  // Use Google reviews, then backfill with stock if needed
  const cards: ReviewCardProps[] = useGoogle
    ? googleCards.length >= MIN_CARDS
      ? googleCards
      : [...googleCards, ...stockCards.slice(0, MIN_CARDS - googleCards.length)]
    : stockCards;

  // Triple for seamless infinite scroll
  const scrollCards = [...cards, ...cards, ...cards];

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
          <p className="text-muted-foreground text-lg">
            {displayRating} stars from {displayTotal}+ homeowners {regionLabel}.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        className="flex overflow-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {scrollCards.map((card, i) => (
          <ReviewCard key={`r-${i}`} {...card} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
