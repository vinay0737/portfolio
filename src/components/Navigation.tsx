import { useState, useEffect } from "react";

interface NavigationProps {
  activeSection: string;
}

function Navigation({ activeSection }: NavigationProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Only run animations after component is mounted (client-side)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Adjust for the fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // Close mobile menu when an item is clicked
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-between">
      {/* Logo */}
      <div 
        className={`font-bold text-2xl transform transition-all duration-500 ${
          isMounted ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
        }`}
      >
        <span className="text-indigo-400">Port</span>
        <span className="text-white">folio</span>
      </div>

      {/* Desktop Navigation Menu */}
      <ul className="hidden md:flex space-x-8">
        {navItems.map((item, index) => (
          <li 
            key={item.id}
            className={`transform transition-all duration-300 ${
              isMounted ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
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
                <span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400 transition-opacity duration-200"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden text-white transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Navigation Menu (overlay) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900/95 z-50 flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <ul className="flex flex-col space-y-6 text-center">
            {navItems.map((item, index) => (
              <li 
                key={item.id}
                className="transform transition-all duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`py-2 px-4 text-xl relative hover:text-indigo-300 transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-indigo-400 font-medium"
                      : "text-white"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navigation;