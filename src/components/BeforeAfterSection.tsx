import { useState, useRef, useCallback } from "react";
import before1 from "@/assets/before1.jpg";
import after1 from "@/assets/after1.jpg";
import before2 from "@/assets/before2.jpg";
import after2 from "@/assets/after2.jpg";

const comparisons = [
  { before: before1, after: after1, title: "Residential Shingle Replacement", desc: "Complete tear-off of deteriorated 25-year-old shingles and replacement with architectural-grade asphalt." },
  { before: before2, after: after2, title: "Commercial Flat Roof Repair", desc: "Removed failing EPDM membrane and installed new TPO roofing system with proper drainage." },
];

const Slider = ({ before, after, title, desc }: typeof comparisons[0]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-heading font-bold text-xl text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{desc}</p>
      </div>
      <div
        ref={containerRef}
        className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-card-hover cursor-col-resize select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* After (full background) */}
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />

        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current?.offsetWidth || "100%" }} />
        </div>

        {/* Divider line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/90 shadow-lg z-10" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground shadow-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-navy">
              <path d="M6 10L3 10M3 10L5.5 7.5M3 10L5.5 12.5M14 10L17 10M17 10L14.5 7.5M17 10L14.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-lg z-20 shadow-md">BEFORE</span>
        <span className="absolute top-4 right-4 bg-gold text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-lg z-20 shadow-md">AFTER</span>
      </div>
    </div>
  );
};

const BeforeAfterSection = () => (
  <section className="py-24 lg:py-32 bg-surface">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">Transformations</span>
        <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">Before & After</h2>
        <p className="text-muted-foreground text-lg">Drag the slider to see the dramatic results of our expert craftsmanship.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {comparisons.map((c) => (
          <Slider key={c.title} {...c} />
        ))}
      </div>
    </div>
  </section>
);

export default BeforeAfterSection;
