import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyWorkWithUsSection } from "@/components/home/WhyWorkWithUsSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { FeaturedSolutionsSection } from "@/components/home/FeaturedSolutionsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { SupportCTASection } from "@/components/home/SupportCTASection";
import { ConsultationCTASection } from "@/components/home/ConsultationCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyWorkWithUsSection />
      <HowWeWorkSection />
      <FeaturedSolutionsSection />
      <ProjectsSection />
      <SupportCTASection />
      <ConsultationCTASection />
    </>
  );
}
