import { useState } from "react";
import { Calculator, ArrowRight, Send, MapPin, Home, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const roofTypes = ["Asphalt Shingle", "Metal Roofing", "Flat Roof"] as const;
const homeSizes = ["Small Home", "Medium Home", "Large Home"] as const;

const estimates: Record<string, Record<string, string>> = {
  "Asphalt Shingle": { "Small Home": "$8,000 – $12,000", "Medium Home": "$12,000 – $16,000", "Large Home": "$16,000 – $22,000" },
  "Metal Roofing": { "Small Home": "$20,000 – $28,000", "Medium Home": "$28,000 – $38,000", "Large Home": "$38,000 – $50,000" },
  "Flat Roof": { "Small Home": "$9,000 – $13,000", "Medium Home": "$13,000 – $18,000", "Large Home": "$18,000 – $25,000" },
};

const steps = [
  { num: 1, label: "Enter Address", icon: MapPin },
  { num: 2, label: "Select Roof Type", icon: Layers },
  { num: 3, label: "Select Home Size", icon: Home },
];

const EstimateToolSection = () => {
  const { toast } = useToast();
  const [address, setAddress] = useState("");
  const [roofType, setRoofType] = useState<string>("");
  const [homeSize, setHomeSize] = useState<string>("");
  const [estimate, setEstimate] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "", email: "" });

  const currentStep = !address ? 1 : !roofType ? 2 : !homeSize ? 3 : 3;

  const handleCalculate = () => {
    if (!address || !roofType || !homeSize) return;
    setEstimate(estimates[roofType][homeSize]);
    setShowLeadForm(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Quote Request Sent!", description: "Our team will contact you within 24 hours." });
    setLead({ name: "", phone: "", email: "" });
    setShowLeadForm(false);
    setEstimate(null);
  };

  return (
    <section id="estimate-tool" className="py-20 lg:py-28 bg-surface relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Pricing Tool</span>
          <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">
            Get Your Instant Roof Estimate
          </h2>
          <p className="text-muted-foreground text-lg">
            Answer a few quick questions to see a rough price range for your roofing project.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8 px-4">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center text-center flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep >= step.num
                      ? "bg-gold text-accent-foreground shadow-md shadow-gold/25"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-semibold mt-2 transition-colors duration-300 hidden sm:block ${
                    currentStep >= step.num ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 mt-[-1rem] sm:mt-0 rounded transition-colors duration-300 ${
                    currentStep > step.num ? "bg-gold" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-card border border-border/50">
            <div className="space-y-6">
              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Step 1 — Property Address</label>
                <Input
                  placeholder="Enter your home address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-xl h-13 text-base"
                />
              </div>

              {/* Roof Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Step 2 — Roof Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {roofTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setRoofType(type)}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                        roofType === type
                          ? "border-gold bg-gold/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-gold/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Home Size */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Step 3 — Home Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {homeSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setHomeSize(size)}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                        homeSize === size
                          ? "border-gold bg-gold/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-gold/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                disabled={!address || !roofType || !homeSize}
                size="lg"
                className="w-full bg-gold hover:bg-gold-dark text-accent-foreground font-bold text-base rounded-xl py-6 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 disabled:opacity-40"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Estimate
              </Button>
            </div>

            {/* Estimate Result */}
            {estimate && (
              <div className="mt-8 animate-fade-up">
                <div className="bg-navy rounded-2xl p-6 text-center">
                  <p className="text-primary-foreground/60 text-sm mb-1">Your Estimated Range</p>
                  <p className="text-3xl lg:text-4xl font-heading font-extrabold text-gold">{estimate}</p>
                  <p className="text-primary-foreground/40 text-xs mt-2">*Final price depends on roof condition, materials, and scope of work.</p>
                </div>
                <p className="text-center text-muted-foreground text-sm mt-4 font-medium">
                  Want a precise quote? Submit your details below.
                </p>
              </div>
            )}

            {/* Lead Capture */}
            {showLeadForm && (
              <div className="mt-8 pt-8 border-t border-border/50 animate-fade-up">
                <h3 className="text-xl font-heading font-bold text-foreground text-center mb-2">Get Your Exact Quote</h3>
                <p className="text-muted-foreground text-sm text-center mb-6">Our team will contact you within 24 hours.</p>
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <Input placeholder="Full Name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} required className="rounded-xl h-12" />
                  <Input placeholder="Phone Number" type="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} required className="rounded-xl h-12" />
                  <Input placeholder="Email Address" type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} required className="rounded-xl h-12" />
                  <Button type="submit" size="lg" className="w-full bg-gold hover:bg-gold-dark text-accent-foreground font-bold text-base rounded-xl py-6">
                    <Send className="w-5 h-5 mr-2" />
                    Request My Exact Quote
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimateToolSection;
