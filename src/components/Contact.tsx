import { useState, useEffect } from "react";
import { Mail, Phone, Github, Linkedin, ExternalLink, Code, Server, BookOpen } from "lucide-react";

// Define a ColorMap for static Tailwind classes
const colorMap = {
  "blue-400": "text-blue-400",
  "orange-400": "text-orange-400",
  "yellow-400": "text-yellow-400",
  "green-400": "text-green-400"
};

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  href: string | null;
  color: keyof typeof colorMap;
  delay: number;
}

const ContactCard = ({ icon, label, href, color, delay }: ContactCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const colorClass = colorMap[color];
  
  // Detect if on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div
      className={`transform transition-all duration-500 ease-out flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg shadow-lg ${
        isHovered ? "scale-105 bg-gray-900" : "bg-gray-800"
      } ${isMobile ? "active:bg-gray-900 active:scale-105" : "cursor-pointer"}`}
      style={{
        opacity: 1,
        transform: "translate3d(0, 0, 0)",
        transition: `all 0.6s ease ${delay}ms`,
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsHovered(true)}
      onTouchEnd={() => isMobile && setTimeout(() => setIsHovered(false), 300)}
    >
      <div className={`${colorClass} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      {href ? (
        <a
          href={href}
          className={`${colorClass} hover:text-white transition-colors flex items-center gap-1 font-medium text-xs sm:text-sm md:text-base truncate`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="truncate">{label}</span>
          <ExternalLink className="w-3 h-3 opacity-70 flex-shrink-0" />
        </a>
      ) : (
        <span className="text-gray-200 font-medium text-xs sm:text-sm md:text-base truncate">{label}</span>
      )}
    </div>
  );
};

// CSS for animations - moved to a separate style sheet
const fadeInStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease forwards;
  }
`;

const ProfessionalContact = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Add the styles to the document head
    const styleElement = document.createElement('style');
    styleElement.textContent = fadeInStyles;
    document.head.appendChild(styleElement);
    
    setMounted(true);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  const contactItems = [
    {
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "vekkulurivinay9390@gmail.com",
      href: "mailto:vekkulurivinay9390@gmail.com",
      color: "blue-400" as const,
      delay: 100
    },
    {
      icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "+91 9390910012",
      href: null,
      color: "blue-400" as const,
      delay: 200
    },
    {
      icon: <Github className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "GitHub Profile",
      href: "https://github.com/vinay0737",
      color: "blue-400" as const,
      delay: 300
    },
    {
      icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/vekkuluri-vinay-43966328b/",
      color: "blue-400" as const,
      delay: 400
    },
    {
      icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "CodeChef Profile",
      href: "https://www.codechef.com/users/vinay53",
      color: "orange-400" as const,
      delay: 500
    },
    {
      icon: <Server className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "LeetCode Profile",
      href: "https://leetcode.com/u/vinay9390/",
      color: "yellow-400" as const,
      delay: 600
    },
    {
      icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "GeeksforGeeks Profile",
      href: "https://www.geeksforgeeks.org/user/vekkulurivo047/",
      color: "green-400" as const,
      delay: 700
    }
  ];

  return (
    <section className="relative px-3 sm:px-4 py-12 sm:py-16 overflow-hidden">
      {/* Static background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 opacity-90" />
      
      {/* Static decorative elements instead of animated ones */}
      <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500 rounded-full filter blur-3xl opacity-10" />
      <div className="absolute bottom-1/4 right-1/3 w-28 sm:w-40 h-28 sm:h-40 bg-purple-500 rounded-full filter blur-3xl opacity-10" />
      
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="inline-block text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3 sm:mb-4">
            Connect With Me
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>
        
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {mounted && contactItems.map((item, index) => (
            <ContactCard key={index} {...item} />
          ))}
        </div>
        
        {/* Professional footer */}
        <div className="mt-8 sm:mt-12 text-center text-gray-400 opacity-80">
          <p className="text-xs sm:text-sm">© {new Date().getFullYear()} Vekkuluri Vinay. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalContact;