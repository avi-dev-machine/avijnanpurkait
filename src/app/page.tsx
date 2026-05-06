import { fetchPortfolio } from "@/data/fetchPortfolio";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import ProjectsSection from "@/components/ProjectsSection";
import UpcomingProjectsSection from "@/components/UpcomingProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default async function Home() {
  const data = await fetchPortfolio();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection data={data} />
        <QuoteSection />
        <ProjectsSection projects={data.projects} />
        <UpcomingProjectsSection projects={data.upcomingProjects} />
        <ExperienceSection experience={data.experience} />
        <SkillsSection skills={data.technicalSkills} />
        <AboutSection data={data} />
        <EducationSection education={data.education} />
        <AchievementsSection achievements={data.achievements} />
        <ContactSection contact={data.candidate.contact} />
      </main>
      <Footer candidate={data.candidate} />
    </>
  );
}
