import { Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy-dark py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-extrabold text-sm">PR</span>
            </div>
            <span className="font-heading font-bold text-primary-foreground">PeakRoof</span>
          </div>
          <p className="text-primary-foreground/50 text-sm leading-relaxed">
            Premium roofing solutions for residential and commercial properties. Quality you can trust.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-bold text-primary-foreground mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/50">
            <li>Roof Replacement</li>
            <li>Roof Repair</li>
            <li>Storm Damage</li>
            <li>Inspections</li>
            <li>Gutter Installation</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-primary-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Services", "Why Us", "Projects", "Reviews", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(" ", "-")}`} className="text-primary-foreground/50 hover:text-gold transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-primary-foreground mb-4">Contact</h4>
          <div className="space-y-3 text-sm text-primary-foreground/50">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold" />
              <a href="tel:+15551234567" className="hover:text-gold transition-colors">(555) 123-4567</a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold mt-0.5" />
              <span>Greater Cincinnati, OH</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/40">
        © {new Date().getFullYear()} PeakRoof Roofing Co. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
