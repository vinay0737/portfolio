import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Particles from "./components/Particles";

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Handle initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "education", "experience", "projects", "contact"];
      
      // Determine which section is currently visible
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      // Add scrolled class for header styling
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track cursor for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 1],
            opacity: [0, 1, 1]
          }}
          transition={{ 
            duration: 1.8,
            times: [0, 0.5, 1],
            repeat: Infinity
          }}
          className="text-4xl font-bold text-white"
        >
          <span className="text-indigo-400">Port</span>
          <span className="text-white">folio</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 overflow-hidden">
      {/* Custom cursor effect */}
      <motion.div 
        className="fixed w-6 h-6 rounded-full bg-indigo-500 mix-blend-difference pointer-events-none z-50"
        animate={{ 
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
          scale: scrolled ? 0.7 : 1
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      
      {/* Particle background effect */}
      <div className="fixed inset-0 z-0">
        <Particles />
      </div>

      {/* Fixed navigation header */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          backgroundColor: scrolled ? "rgba(15, 23, 42, 0.9)" : "rgba(15, 23, 42, 0)"
        }}
        transition={{ 
          delay: 0.5,
          duration: 0.5
        }}
        style={{ 
          backdropFilter: scrolled ? "blur(8px)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
          padding: scrolled ? "0.5rem 0" : "1rem 0"
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <Navigation activeSection={activeSection} />
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10">
        <section id="hero" className="min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <Hero />
          </div>
        </section>

        <motion.section 
          id="about"
          className="py-24 bg-slate-800 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="absolute -right-32 -top-32 w-96 h-96 bg-indigo-500 rounded-full opacity-10"
            animate={{ 
              x: [0, 20, 0],
              y: [0, 30, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut"
            }}
          />
          
          <div className="max-w-6xl mx-auto px-6 relative">
            <motion.div variants={fadeInUp}>
              <About />
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="education" 
          className="py-24 bg-slate-900 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="absolute -left-32 -bottom-32 w-96 h-96 bg-purple-500 rounded-full opacity-10"
            animate={{ 
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut"
            }}
          />
          
          <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={fadeInUp}>
              <Education />
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="experience" 
          className="py-24 bg-slate-800 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="absolute -right-32 -bottom-32 w-96 h-96 bg-indigo-600 rounded-full opacity-10"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 18,
              ease: "easeInOut"
            }}
          />
          
          <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={fadeInUp}>
              <Experience />
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="projects" 
          className="py-24 bg-slate-900 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="absolute -left-32 -top-32 w-96 h-96 bg-blue-500 rounded-full opacity-10"
            animate={{ 
              x: [0, -30, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 25,
              ease: "easeInOut"
            }}
          />
          
          <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={fadeInUp}>
              <Projects />
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="contact" 
          className="py-24 bg-slate-800 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={fadeInUp}>
              <Contact />
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer with animation */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Footer />
      </motion.footer>
    </div>
  );
}

export default App;