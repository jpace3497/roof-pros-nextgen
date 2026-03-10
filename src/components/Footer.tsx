import { Phone, MapPin, Mail, Clock } from "lucide-react";
import type { LeadData } from "@/types/lead";
import type { GoogleReviewsData } from "@/hooks/useGoogleReviews";
import { phoneTelHref } from "@/hooks/useLeadData";

interface FooterProps {
  lead: LeadData;
  reviewsData?: GoogleReviewsData | null;
}

const Footer = ({ lead, reviewsData }: FooterProps) => {
  const hours = reviewsData?.found ? reviewsData.hours : undefined;
  const initials = lead.companyName
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const locationShort = lead.city && lead.state
    ? `${lead.city}, ${lead.state}`
    : lead.city || lead.state || "Your Area";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-extrabold text-sm">{initials}</span>
              </div>
              <span className="font-heading font-bold text-primary-foreground">{lead.companyName}</span>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Premium roofing solutions for residential and commercial properties. Quality you can trust.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/50">
              <li>Roof Replacement</li>
              <li>Roof Repair</li>
              <li>Storm Damage</li>
              <li>Roof Inspection</li>
              <li>Emergency Roof Repair</li>
              <li>Gutter Installation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Services", "Why Us", "Projects", "Reviews", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ", "-")}`} className="text-primary-foreground/50 hover:text-gold transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/50">
              {lead.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold" />
                  <a href={phoneTelHref(lead.phone)} className="hover:text-gold transition-colors">{lead.phone}</a>
                </div>
              )}
              {lead.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" />
                  <a href={`mailto:${lead.email}`} className="hover:text-gold transition-colors">{lead.email}</a>
                </div>
              )}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span>{locationShort}</span>
              </div>
            </div>
            {hours && hours.length > 0 && (
              <div className="mt-6">
                <h4 className="font-heading font-bold text-primary-foreground mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  Business Hours
                </h4>
                <ul className="space-y-1 text-sm text-primary-foreground/50">
                  {hours.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/40">
          © {currentYear} {lead.companyName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
