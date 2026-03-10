import { Award, Shield, DollarSign, Star } from "lucide-react";
import type { LeadData } from "@/types/lead";

interface WhyChooseUsProps {
  lead: LeadData;
}

const items = [
  { icon: Award, title: "20+ Years Experience", desc: "Two decades of trusted roofing expertise in the community." },
  { icon: Shield, title: "Licensed & Insured", desc: "Fully licensed, bonded, and insured for your complete protection." },
  { icon: DollarSign, title: "Free Estimates", desc: "No-obligation quotes with transparent, upfront pricing." },
  { icon: Star, title: "5-Star Reviews", desc: "Hundreds of satisfied customers and top-rated on every platform." },
];

const WhyChooseUs = ({ lead }: WhyChooseUsProps) => (
  <section id="why-us" className="py-24 lg:py-32 bg-navy">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">Why {lead.companyName}</span>
        <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-primary-foreground mt-3 mb-4">Why Homeowners Choose Us</h2>
        <p className="text-primary-foreground/60 text-lg">Quality, integrity, and results — the {lead.companyName} difference.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.title} className="text-center p-8 rounded-2xl bg-navy-light/30 border border-primary-foreground/10 hover:border-gold/30 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
              <item.icon className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-lg font-heading font-bold text-primary-foreground mb-2">{item.title}</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
