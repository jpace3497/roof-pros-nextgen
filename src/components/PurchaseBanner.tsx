import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LeadData } from "@/types/lead";

interface PurchaseBannerProps {
  lead: LeadData;
}

const PurchaseBanner = ({ lead }: PurchaseBannerProps) => {
  const [domainOption, setDomainOption] = useState<"own" | "register">("own");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const monthlyTotal = domainOption === "register" ? 115 : 100;
  const cityText = lead.city || "your area";

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: lead.companyName,
          companySlug: lead.companySlug,
          city: lead.city,
          state: lead.state,
          includeDomain: domainOption === "register",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="sticky top-0 z-[60] bg-black border-b border-gold/20"
      style={{ fontFamily: '"Montserrat", "Plus Jakarta Sans", system-ui, sans-serif' }}
    >
      {/* Main bar — always visible */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-12 sm:h-14">

          {/* Left — compact headline */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs sm:text-sm text-white font-bold truncate">
              🔥 This site was made for <span className="text-gold">{lead.companyName}</span>
            </span>
            <span className="hidden md:inline text-white/40 text-xs">—</span>
            <span className="hidden md:inline text-white/40 text-xs truncate">
              $1,500 + ${monthlyTotal}/mo
            </span>
          </div>

          {/* Right — CTA + expand */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile expand toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="sm:hidden flex items-center gap-1 text-white/50 text-xs px-2 py-1"
            >
              Details
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Desktop pricing + domain inline */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="domain"
                    checked={domainOption === "own"}
                    onChange={() => setDomainOption("own")}
                    className="w-3 h-3 accent-amber-400"
                  />
                  <span className="text-white/70">Own domain</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="domain"
                    checked={domainOption === "register"}
                    onChange={() => setDomainOption("register")}
                    className="w-3 h-3 accent-amber-400"
                  />
                  <span className="text-white/70">New domain <span className="text-gold/50">+$15</span></span>
                </label>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={loading}
              size="sm"
              className="bg-gold hover:bg-gold-dark text-black font-extrabold text-xs sm:text-sm rounded-lg px-4 sm:px-6 py-2 sm:py-2.5 shadow-md shadow-gold/15 hover:shadow-lg transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "…" : "Claim This Website"}
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile expanded details */}
      {expanded && (
        <div className="sm:hidden border-t border-white/10 bg-black/95">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <div className="flex justify-between text-xs text-white/60">
              <span>Website build</span>
              <span className="text-white font-semibold">$1,500</span>
            </div>
            <div className="flex justify-between text-xs text-white/60">
              <span>Hosting & maintenance</span>
              <span className="text-white font-semibold min-w-[70px] text-right">${monthlyTotal}/mo</span>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="domain-mobile"
                  checked={domainOption === "own"}
                  onChange={() => setDomainOption("own")}
                  className="w-3.5 h-3.5 accent-amber-400"
                />
                <span className="text-white/80 text-xs">I already own a domain</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="domain-mobile"
                  checked={domainOption === "register"}
                  onChange={() => setDomainOption("register")}
                  className="w-3.5 h-3.5 accent-amber-400"
                />
                <span className="text-white/80 text-xs">Register a domain for me <span className="text-gold/50">(+$15/mo)</span></span>
              </label>
            </div>
            <p className="text-white/20 text-[10px] text-center pt-1">
              If unclaimed, this may be offered to another roofer in {cityText}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseBanner;
