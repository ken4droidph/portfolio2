import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
