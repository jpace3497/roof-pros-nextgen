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

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <ServicesCTA />
    <EstimateToolSection />
    <ProjectsSection />
    <CTASection />
    <MetricsStrip />
    <WhyChooseUs />
    <BeforeAfterSection />
    <ReviewsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
