import before1 from "@/assets/before1.jpg";
import after1 from "@/assets/after1.jpg";
import before2 from "@/assets/before2.jpg";
import after2 from "@/assets/after2.jpg";
import type { LeadData } from "@/types/lead";

interface BeforeAfterSectionProps {
  lead: LeadData;
}

const BeforeAfterSection = ({ lead }: BeforeAfterSectionProps) => {
  const location = lead.city && lead.state
    ? `${lead.city}, ${lead.state}`
    : lead.city || lead.state || "Local Area";

  const comparisons = [
    { before: before1, after: after1, title: "Storm Damage Replacement", caption: `Complete tear-off and re-roof after severe storm damage in ${location}.` },
    { before: before2, after: after2, title: "Full Shingle Roof Replacement", caption: `Aging asphalt shingles replaced with premium architectural shingles in ${location}.` },
  ];

  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Transformations</span>
          <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">Before & After</h2>
          <p className="text-muted-foreground text-lg">See the dramatic results of our expert craftsmanship.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {comparisons.map((c) => (
            <div key={c.title} className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-foreground text-center">{c.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden shadow-card group">
                  <img src={c.before} alt={`Before - ${c.title}`} className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md">Before</span>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-card group">
                  <img src={c.after} alt={`After - ${c.title}`} className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-emerald-500 text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md">After</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm text-center">{c.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
