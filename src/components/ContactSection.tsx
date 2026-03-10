import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { LeadData } from "@/types/lead";
import { phoneTelHref } from "@/hooks/useLeadData";

interface ContactSectionProps {
  lead: LeadData;
}

const trustBadges = [
  "Free Roof Inspection",
  "Fully Licensed & Insured",
  "Fast Response Time",
];

const ContactSection = ({ lead }: ContactSectionProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const serviceArea = lead.city && lead.state
    ? `Greater ${lead.city}, ${lead.state} & surrounding areas`
    : lead.city
      ? `Greater ${lead.city} & surrounding areas`
      : lead.state
        ? `${lead.state} & surrounding areas`
        : "Your area & surrounding communities";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Quote Request Sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-3xl lg:text-5xl font-heading font-extrabold text-foreground mt-3 mb-4">Request a Free Quote</h2>
          <p className="text-muted-foreground text-lg">Fill out the form below and we'll get back to you within 24 hours.</p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold" />
              <span className="text-foreground font-semibold text-sm">{badge}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card rounded-2xl p-8 shadow-card border border-border/50 space-y-5">
            <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded-xl h-12" />
            <Input placeholder="Phone Number" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required className="rounded-xl h-12" />
            <Input placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="rounded-xl h-12" />
            <Textarea placeholder="Tell us about your roofing needs..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="rounded-xl resize-none" />
            <Button type="submit" size="lg" className="w-full bg-gold hover:bg-gold-dark text-accent-foreground font-bold text-lg rounded-xl py-7 shadow-lg shadow-gold/25">
              <Send className="w-5 h-5 mr-2" />
              Send Quote Request
            </Button>
          </form>

          <div className="lg:col-span-2 space-y-8">
            {lead.phone && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground">Call Us</h4>
                  <a href={phoneTelHref(lead.phone)} className="text-muted-foreground hover:text-gold transition-colors">{lead.phone}</a>
                </div>
              </div>
            )}
            {lead.email && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground">Email Us</h4>
                  <a href={`mailto:${lead.email}`} className="text-muted-foreground hover:text-gold transition-colors">{lead.email}</a>
                </div>
              </div>
            )}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground">Service Area</h4>
                <span className="text-muted-foreground">{serviceArea}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
