import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/cta-roofing-bg.jpg";

const CTASection = () => (
  <section className="relative py-28 lg:py-36 overflow-hidden">
    <img
      src={ctaBg}
      alt="Roofing project"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-navy-dark/90" />
    {/* Subtle roof pattern overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `repeating-linear-gradient(120deg, transparent, transparent 40px, hsl(var(--primary-foreground)) 40px, hsl(var(--primary-foreground)) 41px)`,
    }} />
    <div className="relative container mx-auto px-4 lg:px-8 text-center">
      <h2 className="text-3xl lg:text-5xl xl:text-6xl font-heading font-extrabold text-primary-foreground mb-6 max-w-4xl mx-auto leading-tight">
        Need Roofing Help? Get Your Free Estimate Today.
      </h2>
      <p className="text-primary-foreground/60 text-lg lg:text-xl max-w-2xl mx-auto mb-12">
        Our team responds fast and provides honest, reliable roofing solutions.
      </p>
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <a href="#contact">
          <Button size="lg" className="bg-gold hover:bg-gold-dark text-accent-foreground font-bold text-lg rounded-xl px-12 py-7 shadow-lg shadow-gold/25">
            Get Free Estimate
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </a>
        <a href="tel:+15551234567">
          <Button size="lg" className="border-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-bold text-lg rounded-xl px-12 py-7">
            <Phone className="w-5 h-5 mr-2" />
            Call (555) 123-4567
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
