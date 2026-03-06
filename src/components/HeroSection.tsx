import { Phone, ArrowRight, Shield, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-roofing-video.mp4";
const HeroSection = () => {
  const badges = [
    { icon: Shield, label: "Licensed & Insured" },
    { icon: Star, label: "5-Star Rated" },
    { icon: MapPin, label: "Serving the Tri-State Area" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/50" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6 opacity-0 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-sm font-medium">Trusted Local Roofing Experts</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-primary-foreground leading-[1.08] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Your Roof,{" "}
            <span className="text-gradient">Our Priority.</span>
          </h1>

          <p className="text-lg lg:text-xl text-primary-foreground/70 mb-10 max-w-lg leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Premium roofing solutions backed by 20+ years of experience. Quality craftsmanship, honest pricing, and results that last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a href="#contact">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-accent-foreground font-bold text-base rounded-xl px-8 py-6 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="tel:+15551234567">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold text-base rounded-xl px-8 py-6">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
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
