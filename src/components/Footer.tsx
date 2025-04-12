import { useState, useEffect, useRef } from "react";
import { Linkedin, Github, Twitter, ChevronRight, Mail, Heart } from "lucide-react";

// CSS for animations - moved to a separate variable
const shimmerStyles = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .bg-gradient-shimmer {
    background: linear-gradient(
      90deg,
      rgba(99, 102, 241, 0.1),
      rgba(168, 85, 247, 0.1),
      rgba(99, 102, 241, 0.1)
    );
    background-size: 200% 100%;
    animation: shimmer 8s infinite linear;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add the styles to the document head
    const styleElement = document.createElement('style');
    styleElement.textContent = shimmerStyles;
    document.head.appendChild(styleElement);
    
    // Use ref instead of getElementById for better React compatibility
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      
      if (footerRef.current) {
        observer.observe(footerRef.current);
      }
      
      return () => {
        if (footerRef.current) {
          observer.unobserve(footerRef.current);
        }
        document.head.removeChild(styleElement);
      };
    } else {
      // Fallback for environments without IntersectionObserver
      setIsVisible(true);
      
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, []);
  
  const fadeInUpStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease, transform 0.6s ease`,
    transitionDelay: `${delay}ms`,
  });
  
  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white py-12 mt-auto"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-shimmer opacity-50"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-10"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div style={fadeInUpStyle(100)}>
            <h3 className="font-bold text-xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              VINAY VEKKULURI
            </h3>
            <p className="text-slate-300 mb-4 text-sm">
              Creating exceptional digital experiences through innovative solutions and elegant code.
            </p>
          </div>
          
          {/* Quick Links */}
          <div style={fadeInUpStyle(200)}>
            <h3 className="font-bold text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["About", "Education", "Experience", "Projects", "Contact"].map((link) => (
                <li 
                  key={link}
                  className="transform transition-all duration-300 hover:translate-x-1"
                >
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-slate-300 hover:text-indigo-300 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 text-indigo-400" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Skills */}
          <div style={fadeInUpStyle(300)}>
            <h3 className="font-bold text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {["React", "JavaScript", "Python", "Node.js", "UI/UX", "MongoDB"].map((skill) => (
                <span 
                  key={skill}
                  className="px-2 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Connect */}
          <div style={fadeInUpStyle(400)}>
            <h3 className="font-bold text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Connect
            </h3>
            <a 
              href="mailto:vekkulurivinay9390@gmail.com" 
              className="text-sm text-slate-300 hover:text-white flex items-center mb-3 transition-all duration-300 hover:translate-x-1"
            >
              <Mail className="w-4 h-4 mr-2 text-indigo-400" />
              vekkulurivinay9390@gmail.com
            </a>
            
            <div className="flex space-x-3">
              {[
                { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, url: "https://www.linkedin.com/in/vekkuluri-vinay-43966328b/" },
                { name: "GitHub", icon: <Github className="w-4 h-4" />, url: "https://github.com/vinay0737" },
                { name: "Twitter", icon: <Twitter className="w-4 h-4" />, url: "#" }
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div 
          className="mt-8 pt-6 border-t border-slate-800/50"
          style={fadeInUpStyle(500)}
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
            <p>
              © {currentYear} Vekkuluri Vinay. All rights reserved.
            </p>
            <p className="mt-2 md:mt-0 flex items-center">
              Made with <Heart className="w-3 h-3 mx-1 text-red-400" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;