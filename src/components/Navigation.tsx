import { motion } from "framer-motion";

function Navigation({ activeSection }) {
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Adjust for the fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <nav className="flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="font-bold text-2xl"
      >
        <span className="text-indigo-400">Port</span>
        <span className="text-white">folio</span>
      </motion.div>

      <motion.ul 
        className="hidden md:flex space-x-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {navItems.map((item) => (
          <motion.li key={item.id} variants={item}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`py-2 px-1 relative hover:text-indigo-300 transition-colors duration-300 ${
                activeSection === item.id
                  ? "text-indigo-400 font-medium"
                  : "text-slate-300"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span 
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          </motion.li>
        ))}
      </motion.ul>
      
      {/* Mobile menu button with animation */}
      <motion.button 
        className="md:hidden text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </motion.button>
    </nav>
  );
}

export default Navigation;