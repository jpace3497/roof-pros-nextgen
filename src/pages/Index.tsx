import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EstimateToolSection from "@/components/EstimateToolSection";
import ServicesSection from "@/components/ServicesSection";
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
    <EstimateToolSection />
    <ServicesSection />
    <CTASection />
    <MetricsStrip />
    <WhyChooseUs />
    <ProjectsSection />
    <BeforeAfterSection />
    <ReviewsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
