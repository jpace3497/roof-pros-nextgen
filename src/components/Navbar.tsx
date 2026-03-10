import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LeadData } from "@/types/lead";
import { phoneTelHref } from "@/hooks/useLeadData";

interface NavbarProps {
  lead: LeadData;
  hasBanner?: boolean;
}

const Navbar = ({ lead, hasBanner }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Projects", href: "#projects" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const initials = lead.companyName
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className={`sticky ${hasBanner ? "top-[48px] sm:top-[56px]" : "top-0"} left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-navy-light/20`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-extrabold text-lg">{initials}</span>
            </div>

            <div>
              <span className="font-heading font-bold text-lg text-primary-foreground tracking-tight">
                {lead.companyName}
              </span>

              <span className="block text-[10px] uppercase tracking-[0.2em] text-gold font-medium -mt-1">
                Roofing Co.
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-primary-foreground/70 hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {lead.phone && (
              <a href={phoneTelHref(lead.phone)} className="flex items-center gap-2 text-gold font-semibold text-sm">
                <Phone className="w-4 h-4" />
                {lead.phone}
              </a>
            )}

            <a href="#contact">
              <Button className="bg-gold hover:bg-gold-dark text-accent-foreground font-semibold rounded-lg px-6">
                Free Quote
              </Button>
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-primary-foreground">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {isOpen && (
          <div className="lg:hidden pb-6 space-y-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-primary-foreground/70 hover:text-gold py-2"
              >
                {link.label}
              </a>
            ))}

            {lead.phone && (
              <a href={phoneTelHref(lead.phone)} className="flex items-center gap-2 text-gold font-semibold text-sm py-2">
                <Phone className="w-4 h-4" />
                {lead.phone}
              </a>
            )}

            <a href="#contact">
              <Button className="w-full bg-gold hover:bg-gold-dark text-accent-foreground font-semibold">
                Free Quote
              </Button>
            </a>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
