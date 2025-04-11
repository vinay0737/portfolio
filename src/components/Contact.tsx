import { useState, useEffect } from "react";
import { Mail, Phone, Github, Linkedin, ExternalLink, Code, Server, BookOpen } from "lucide-react";

const ContactCard = ({ icon, label, href, color, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`transform transition-all duration-500 ease-out flex items-center gap-3 p-4 rounded-lg shadow-lg cursor-pointer ${
        isHovered ? "scale-105 bg-gray-900" : "bg-gray-800"
      }`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "0.6s",
        animationFillMode: "both",
        animationName: "fadeInUp",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-${color} flex items-center justify-center`}>
        {icon}
      </div>
      {href ? (
        <a
          href={href}
          className={`text-${color} hover:text-white transition-colors flex items-center gap-1 font-medium`}
          target="_blank"
          rel="noreferrer"
        >
          {label}
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      ) : (
        <span className="text-gray-200 font-medium">{label}</span>
      )}
    </div>
  );
};

const ProfessionalContact = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Add keyframe animation to document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translate3d(0, 30px, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
      
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.4);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(66, 153, 225, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
        }
      }
      
      .animate-pulse-slow {
        animation: pulse 3s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const contactItems = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "vekkulurivinay9390@gmail.com",
      href: "mailto:vekkulurivinay9390@gmail.com",
      color: "blue-400",
      delay: 100
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "+91 9390910012",
      href: null,
      color: "blue-400",
      delay: 200
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub Profile",
      href: "https://github.com/vinay0737",
      color: "blue-400",
      delay: 300
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/vekkuluri-vinay-43966328b/",
      color: "blue-400",
      delay: 400
    },
    {
      icon: <Code className="w-5 h-5" />,
      label: "CodeChef Profile",
      href: "https://www.codechef.com/users/vinay53",
      color: "orange-400",
      delay: 500
    },
    {
      icon: <Server className="w-5 h-5" />,
      label: "LeetCode Profile",
      href: "https://leetcode.com/u/vinay9390/",
      color: "yellow-400",
      delay: 600
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "GeeksforGeeks Profile",
      href: "https://www.geeksforgeeks.org/user/vekkulurivo047/",
      color: "green-400",
      delay: 700
    }
  ];

  return (
    <section className="relative px-4 py-16 overflow-hidden">
      {/* Background with gradient and animated stars */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 opacity-90" />
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow" style={{ animationDelay: "1s" }} />
      
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="inline-block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Connect With Me
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mounted && contactItems.map((item, index) => (
            <ContactCard key={index} {...item} />
          ))}
        </div>
        
        {/* Professional footer */}
        <div className="mt-12 text-center text-gray-400 opacity-80">
          <p className="text-sm">© {new Date().getFullYear()} Vekkuluri Vinay. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalContact;