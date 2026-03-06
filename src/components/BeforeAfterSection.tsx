import before1 from "@/assets/before1.jpg";
import after1 from "@/assets/after1.jpg";
import before2 from "@/assets/before2.jpg";
import after2 from "@/assets/after2.jpg";

const comparisons = [
  { before: before1, after: after1, title: "Residential Shingle Replacement" },
  { before: before2, after: after2, title: "Commercial Flat Roof Repair" },
];

const BeforeAfterSection = () => (
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
              <div className="relative rounded-xl overflow-hidden shadow-card">
                <img src={c.before} alt="Before" className="w-full aspect-[4/3] object-cover" />
                <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full">Before</span>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-card">
                <img src={c.after} alt="After" className="w-full aspect-[4/3] object-cover" />
                <span className="absolute top-3 left-3 bg-gold text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">After</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BeforeAfterSection;
