import { ArrowRight } from "lucide-react";
import serviceReplacement from "@/assets/service-replacement.jpg";
import serviceRepair from "@/assets/service-repair.jpg";
import serviceStorm from "@/assets/service-storm.jpg";
import serviceInspection from "@/assets/service-inspection.jpg";
import serviceEmergency from "@/assets/service-emergency.jpg";
import serviceGutter from "@/assets/service-gutter.jpg";

const services = [
  { image: serviceReplacement, title: "Roof Replacement", desc: "Complete tear-off and installation with premium materials and industry-leading warranties." },
  { image: serviceRepair, title: "Roof Repair", desc: "Fast, reliable repairs for leaks, damaged shingles, flashing issues, and more." },
  { image: serviceStorm, title: "Storm Damage Repair", desc: "Emergency response for hail, wind, and storm damage. We work with your insurance." },
  { image: serviceInspection, title: "Roof Inspection", desc: "Comprehensive inspections with detailed reports to catch problems before they grow." },
  { image: serviceEmergency, title: "Emergency Roof Repair", desc: "24/7 emergency services to protect your home when disaster strikes." },
  { image: serviceGutter, title: "Gutter Installation", desc: "Seamless gutter systems to protect your foundation and landscaping." },
];

const ServicesSection = () => (
  <section id="services" className="py-24 lg:py-32 bg-surface">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">What We Do</span>
        <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">Our Roofing Services</h2>
        <p className="text-muted-foreground text-lg">From minor repairs to complete replacements, we deliver expert solutions for every roofing need.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {services.map((s) => (
          <div
            key={s.title}
            className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer h-[340px]"
          >
            <img
              src={s.image}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy/70 to-navy/20 transition-opacity duration-500" />
            <div className="relative h-full flex flex-col justify-end p-8 text-center">
              <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">{s.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="inline-flex items-center gap-1.5 text-gold text-sm font-bold">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
