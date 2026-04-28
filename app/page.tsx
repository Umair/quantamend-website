import Navbar from "./components/navbar";
import Hero from "./components/hero";
import SocialProof from "./components/social-proof";
import AiWorkforce from "./components/ai-workforce";
import Problem from "./components/problem";
import AiSystems from "./components/ai-systems";
import HowItWorks from "./components/how-it-works";
import Testimonials from "./components/testimonials";
import About from "./components/about";
import DarkCta from "./components/booking";
import Footer from "./components/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QuantaMend",
  url: "https://quantamend.com",
  logo: "https://quantamend.com/logo.png",
  description:
    "AI operations and automation agency building lead reactivation pipelines, voice receptionists, and multilingual concierge systems for high-revenue local businesses.",
  sameAs: [
    "https://x.com/quantamend",
    "https://linkedin.com/company/quantamend",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@quantamend.com",
    contactType: "sales",
  },
  areaServed: "US",
  serviceType: [
    "AI Lead Reactivation",
    "AI Voice Receptionist",
    "Multilingual AI Concierge",
    "Business Automation",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <AiWorkforce />
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
