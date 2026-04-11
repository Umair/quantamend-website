import Navbar from "./components/navbar";
import Hero from "./components/hero";
import SocialProof from "./components/social-proof";
import Problem from "./components/problem";
import AiSystems from "./components/ai-systems";
import HowItWorks from "./components/how-it-works";
import Testimonials from "./components/testimonials";
import About from "./components/about";
import DarkCta from "./components/booking";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <div className="section-divider" />
        <AiSystems />
        <div className="section-divider" />
        <HowItWorks />
        <Testimonials />
        <About />
        <DarkCta />
      </main>
      <Footer />
    </>
  );
}
