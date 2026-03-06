import { Home, Clock, Star, ShieldCheck } from "lucide-react";

const metrics = [
  { icon: Home, value: "1,500+", label: "Roofs Installed" },
  { icon: Clock, value: "20+", label: "Years Experience" },
  { icon: Star, value: "4.9", label: "Star Rating" },
  { icon: ShieldCheck, value: "100%", label: "Licensed & Insured" },
];

const MetricsStrip = () => (
  <section className="py-14 lg:py-16 bg-navy-dark">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
              <m.icon className="w-6 h-6 text-gold" />
            </div>
            <p className="text-3xl lg:text-4xl font-heading font-extrabold text-primary-foreground">{m.value}</p>
            <p className="text-primary-foreground/50 text-sm font-medium mt-1">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MetricsStrip;
