import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/Particles";

// Create a CSS style element
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      @keyframes float {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(20px, 30px); }
      }
      
      @keyframes floatAlt {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-20px, 20px); }
      }
      
      @keyframes floatSlow {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(30px, -20px); }
      }
      
      @keyframes floatReverse {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-30px, -30px); }
      }
    `
  }}/>
);

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Handle initial loading animation with simpler approach
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effects with optimized event handler
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "education", "experience", "projects", "contact"];
      
      // Check if scrolled for header styling (simpler check)
      const hasScrolled = window.scrollY > 50;
      if (hasScrolled !== scrolled) {
        setScrolled(hasScrolled);
      }
      
      // Find active section with fewer calculations
      let currentSection = activeSection;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, scrolled]);

  // Track cursor with debouncing for better performance
  useEffect(() => {
    let timeoutId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }, 10);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  // Animation variants with simpler transitions
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
        <div className="text-4xl font-bold text-white animate-pulse">
          <span className="text-indigo-400">Port</span>
          <span className="text-white">folio</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200">
      {/* Add the global styles */}
      <GlobalStyles />
      
      {/* Custom cursor effect - simpler implementation */}
      <div 
        className="fixed w-6 h-6 rounded-full bg-indigo-500 mix-blend-difference pointer-events-none z-50 transition-transform duration-200"
        style={{ 
          transform: `translate(${cursorPosition.x - 12}px, ${cursorPosition.y - 12}px) scale(${scrolled ? 0.7 : 1})`,
        }}
      />
      
      {/* Background animation - using the optimized component */}
      <div className="fixed inset-0 z-0">
        <BackgroundAnimation />
      </div>

      {/* Fixed navigation header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-slate-900/90 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <Navigation activeSection={activeSection} />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        <section id="hero" className="min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <Hero />
          </div>
        </section>

        <section 
          id="about"
          className="py-24 bg-slate-800 relative overflow-hidden"
        >
          <div 
            className="absolute -right-32 -top-32 w-96 h-96 bg-indigo-500 rounded-full opacity-10"
            style={{ animation: "float 20s ease-in-out infinite" }}
          />
          
          <div className="max-w-6xl mx-auto px-6 relative">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <About />
            </motion.div>
          </div>
        </section>

        <section 
          id="education" 
          className="py-24 bg-slate-900 relative"
        >
          <div 
            className="absolute -left-32 -bottom-32 w-96 h-96 bg-purple-500 rounded-full opacity-10"
            style={{ animation: "floatAlt 15s ease-in-out infinite" }}
          />
          
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Education />
            </motion.div>
          </div>
        </section>

        <section 
          id="experience" 
          className="py-24 bg-slate-800 relative"
        >
          <div 
            className="absolute -right-32 -bottom-32 w-96 h-96 bg-indigo-600 rounded-full opacity-10"
            style={{ animation: "floatSlow 18s ease-in-out infinite" }}
          />
          
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Experience />
            </motion.div>
          </div>
        </section>

        <section 
          id="projects" 
          className="py-24 bg-slate-900 relative overflow-hidden"
        >
          <div 
            className="absolute -left-32 -top-32 w-96 h-96 bg-blue-500 rounded-full opacity-10"
            style={{ animation: "floatReverse 25s ease-in-out infinite" }}
          />
          
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Projects />
            </motion.div>
          </div>
        </section>

        <section 
          id="contact" 
          className="py-24 bg-slate-800 relative"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Contact />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer with simpler animation */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

export default App;