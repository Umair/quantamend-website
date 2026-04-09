import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Services from "./components/services";
import Industries from "./components/industries";
import About from "./components/about";
import Process from "./components/process";
import Testimonials from "./components/testimonials";
import Booking from "./components/booking";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Industries />
        <About />
        <Process />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
