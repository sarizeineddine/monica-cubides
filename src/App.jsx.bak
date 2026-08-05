import { useLenis } from "@/hooks/useLenis";
import AmbientBackground from "@/components/shared/AmbientBackground";
import BackgroundIcons from "@/components/shared/BackgroundIcons";
import CursorGlow from "@/components/shared/CursorGlow";
import ScrollProgress from "@/components/shared/ScrollProgress";
import Nav from "@/components/shared/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WealthEngine from "@/components/sections/WealthEngine";
import Credentials from "@/components/sections/Credentials";
import Services from "@/components/sections/Services";
import SelectedWork from "@/components/sections/SelectedWork";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/shared/Footer";

export default function App() {
  useLenis();

  return (
    <div className="relative min-h-screen text-[color:var(--color-ink)]">
      <AmbientBackground />
      <BackgroundIcons />
      <CursorGlow />
      <div className="grain-overlay" />
      <ScrollProgress />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <WealthEngine />
        <Credentials />
        <Services />
        <SelectedWork />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}