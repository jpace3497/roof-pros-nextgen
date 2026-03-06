import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesCTA = () => (
  <div className="py-16 lg:py-20 bg-background">
    <div className="container mx-auto px-4 lg:px-8 text-center">
      <div className="max-w-xl mx-auto">
        <h3 className="text-2xl lg:text-3xl font-heading font-extrabold text-foreground mb-3">
          Not Sure Which Roofing Service You Need?
        </h3>
        <p className="text-muted-foreground text-lg mb-8">
          Get an instant price estimate in under 30 seconds.
        </p>
        <a href="#estimate-tool">
          <Button
            size="lg"
            className="bg-gold hover:bg-gold-dark text-accent-foreground font-bold text-base rounded-xl px-10 py-6 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("estimate-tool")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Instant Roof Estimate
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </a>
      </div>
      <div className="mt-12 mx-auto max-w-xs h-px bg-border" />
    </div>
  </div>
);

export default ServicesCTA;
