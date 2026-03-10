import PurchaseBanner from "@/components/PurchaseBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChatBubble from "@/components/ChatBubble";
import ServicesSection from "@/components/ServicesSection";
import ServicesCTA from "@/components/ServicesCTA";
import EstimateToolSection from "@/components/EstimateToolSection";
import CTASection from "@/components/CTASection";
import MetricsStrip from "@/components/MetricsStrip";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProjectsSection from "@/components/ProjectsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useLeadData } from "@/hooks/useLeadData";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import type { LeadData } from "@/types/lead";

const defaults: LeadData = {
  companyName: "PeakRoof",
  companySlug: "peakroof",
  city: "Boston",
  state: "MA",
  phone: "(555) 123-4567",
  email: "info@peakroof.com",
};

const Index = () => {
  const parsed = useLeadData();

  // Merge parsed data over defaults, but only override with defined values
  // so defaults aren't wiped by undefined fields from URL parsing
  const baseLead: LeadData = parsed
    ? { ...defaults, ...Object.fromEntries(Object.entries(parsed).filter(([, v]) => v !== undefined)) } as LeadData
    : defaults;

  const { data: reviewsData, loading: reviewsLoading } = useGoogleReviews(baseLead);

  // For dynamic routes (not root /), prefer Google Places phone over the fake default
  const isDynamic = !!parsed;
  const urlHasPhone = !!parsed?.phone;
  const googlePhone = reviewsData?.found ? reviewsData.phone : undefined;

  let lead = baseLead;
  if (isDynamic) {
    // Phone priority: URL param > Google Places > hidden
    const resolvedPhone = urlHasPhone ? baseLead.phone : googlePhone || undefined;
    // Email priority: URL param > hidden (Google doesn't return email)
    const urlHasEmail = !!parsed?.email;
    const resolvedEmail = urlHasEmail ? baseLead.email : undefined;
    lead = { ...baseLead, phone: resolvedPhone, email: resolvedEmail };
  }

  return (
    <div className="min-h-screen">
      {isDynamic && <PurchaseBanner lead={lead} />}
      <Navbar lead={lead} hasBanner={isDynamic} />
      <HeroSection lead={lead} reviewsData={reviewsData} />
      <ServicesSection lead={lead} />
      <ServicesCTA />
      <EstimateToolSection />
      <ProjectsSection lead={lead} />
      <CTASection lead={lead} />
      <MetricsStrip reviewsData={reviewsData} />
      <WhyChooseUs lead={lead} />
      <BeforeAfterSection lead={lead} />
      <ReviewsSection lead={lead} reviewsData={reviewsData} reviewsLoading={reviewsLoading} />
      <ContactSection lead={lead} />
      <Footer lead={lead} reviewsData={reviewsData} />
      <ChatBubble />
    </div>
  );
};

export default Index;
