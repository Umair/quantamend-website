import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Services from "./components/services";
import Industries from "./components/industries";
import About from "./components/about";
import Process from "./components/process";
import TechStack from "./components/tech-stack";
import Testimonials from "./components/testimonials";
import Booking from "./components/booking";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <Services />
        <Industries />
        <div className="section-divider" />
        <About />
        <Process />
        <TechStack />
        <div className="section-divider" />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
