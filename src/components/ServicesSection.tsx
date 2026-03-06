import { Home, Wrench, CloudLightning, Search, AlertTriangle, Droplets } from "lucide-react";

const services = [
  { icon: Home, title: "Roof Replacement", desc: "Complete tear-off and installation with premium materials and industry-leading warranties." },
  { icon: Wrench, title: "Roof Repair", desc: "Fast, reliable repairs for leaks, damaged shingles, flashing issues, and more." },
  { icon: CloudLightning, title: "Storm Damage Repair", desc: "Emergency response for hail, wind, and storm damage. We work with your insurance." },
  { icon: Search, title: "Roof Inspection", desc: "Comprehensive inspections with detailed reports to catch problems before they grow." },
  { icon: AlertTriangle, title: "Emergency Roof Repair", desc: "24/7 emergency services to protect your home when disaster strikes." },
  { icon: Droplets, title: "Gutter Installation", desc: "Seamless gutter systems to protect your foundation and landscaping." },
];

const ServicesSection = () => (
  <section id="services" className="py-24 lg:py-32 bg-surface">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">What We Do</span>
        <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">Our Roofing Services</h2>
        <p className="text-muted-foreground text-lg">From minor repairs to complete replacements, we deliver expert solutions for every roofing need.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
          >
            <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
              <s.icon className="w-7 h-7 text-gold" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
