import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold blur-3xl" />
    </div>
    <div className="relative container mx-auto px-4 lg:px-8 text-center">
      <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-foreground mb-6">
        Ready to Protect Your Home?
      </h2>
      <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto mb-10">
        Get a free, no-obligation roof inspection and estimate today. Our experts are standing by to help.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#contact">
          <Button size="lg" className="bg-gold hover:bg-gold-dark text-accent-foreground font-bold text-base rounded-xl px-10 py-6 shadow-lg shadow-gold/25">
            Get Your Free Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </a>
        <a href="tel:+15551234567">
          <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold text-base rounded-xl px-10 py-6">
            <Phone className="w-5 h-5 mr-2" />
            (555) 123-4567
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
