import { Phone, ArrowRight, Shield, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-roofing.jpg";
import type { LeadData } from "@/types/lead";
import type { GoogleReviewsData } from "@/hooks/useGoogleReviews";
import { phoneTelHref } from "@/hooks/useLeadData";

interface HeroSectionProps {
  lead: LeadData;
  reviewsData?: GoogleReviewsData | null;
}

const HeroSection = ({ lead, reviewsData }: HeroSectionProps) => {
  const hasGoogle = reviewsData?.found && reviewsData.rating;
  const displayRating = hasGoogle ? reviewsData!.rating! : 4.9;
  const displayTotal = hasGoogle && reviewsData!.totalReviews ? reviewsData!.totalReviews : 200;
  const starCount = Math.round(displayRating);
  const locationLabel = lead.city && lead.state
    ? `Serving ${lead.city}, ${lead.state}`
    : lead.city
      ? `Serving ${lead.city}`
      : lead.state
        ? `Serving ${lead.state}`
        : "Serving Your Area";

  const badges = [
    { icon: Shield, label: "Licensed & Insured" },
    { icon: Star, label: "5-Star Rated" },
    { icon: MapPin, label: locationLabel },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury home with premium roofing"
          className="w-full h-full object-cover animate-hero-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/50" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6 opacity-0 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-sm font-medium">
              {lead.city ? `${lead.city}'s Trusted Roofing Experts` : "Trusted Local Roofing Experts"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-primary-foreground leading-[1.08] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {lead.companyName} —{" "}
            <span className="text-gradient">Your Roof, Our Priority.</span>
          </h1>

          <p className="text-lg lg:text-xl text-primary-foreground/70 mb-10 max-w-lg leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Premium roofing solutions backed by 20+ years of experience. Quality craftsmanship, honest pricing, and results that last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a href="#contact">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-accent-foreground font-bold text-base rounded-xl px-8 py-6 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            {lead.phone && (
              <a href={phoneTelHref(lead.phone)}>
                <Button size="lg" className="bg-primary-foreground/15 backdrop-blur-sm border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/25 font-bold text-base rounded-xl px-8 py-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            )}
          </div>

          {/* Trust Rating */}
          <div className="flex items-center gap-2 mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <div className="flex gap-0.5">
              {Array.from({ length: starCount }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-primary-foreground/70 text-sm font-medium">{displayRating} Rating from {displayTotal}+ Homeowners</span>
          </div>

          <div className="flex flex-wrap gap-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {badges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm font-semibold text-primary-foreground/80">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
