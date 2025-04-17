import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Custom hook for parallax effect on mouse movement
function useMouseParallax(strength = 20) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Only apply parallax effect on devices that likely have a mouse
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * strength,
        y: (e.clientY / window.innerHeight - 0.5) * strength
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength]);
  
  return mousePosition;
}

export default function Hero() {
  const mouseParallax = useMouseParallax(40);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect if user has scrolled for animation triggers
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    // Check device type
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkDevice);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const backgroundShapes = [
    { color: "rgba(59, 130, 246, 0.2)", blur: "120px", size: 400 },
    { color: "rgba(8, 145, 178, 0.15)", blur: "150px", size: 500 },
    { color: "rgba(99, 102, 241, 0.2)", blur: "100px", size: 300 },
    { color: "rgba(16, 185, 129, 0.1)", blur: "180px", size: 600 }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 overflow-hidden"
    >
      {/* Animated background shapes - responsive sizes */}
      {backgroundShapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-70"
          style={{
            width: isMobile ? shape.size * 0.6 : shape.size,
            height: isMobile ? shape.size * 0.6 : shape.size,
            filter: `blur(${isMobile ? parseInt(shape.blur) * 0.7 + 'px' : shape.blur})`,
            background: shape.color,
            top: `${index * (isMobile ? 15 : 20)}%`,
            left: `${(index * 25) % 100}%`,
            zIndex: 0
          }}
          animate={{
            x: isMobile ? 0 : mouseParallax.x * (index + 1) * 0.5,
            y: isMobile ? 0 : mouseParallax.y * (index + 1) * 0.5,
            scale: [1, 1.1, 1],
          }}
          transition={{
            scale: {
              repeat: Infinity,
              duration: 10 + index * 2,
              repeatType: "reverse"
            },
            x: { type: "spring", stiffness: 60, damping: 90 },
            y: { type: "spring", stiffness: 60, damping: 90 }
          }}
        />
      ))}

      {/* Semi-transparent overlay with particles effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-sm z-0 rounded-xl" />

      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl z-0 animate-pulse" 
           style={{ animationDuration: '4s' }}/>

      {/* Content container with staggered animations */}
      <motion.div
        className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl relative z-10 text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-2 sm:mb-3 inline-block py-1 px-2 sm:px-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full backdrop-blur-md"
        >
          <span className="text-xs sm:text-sm font-medium text-blue-200">BlockChain Developer & Data Engineer</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 drop-shadow-lg"
        >
          Hey, I'm{" "}
          <motion.span 
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
            animate={{ 
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "linear" 
            }}
            style={{ backgroundSize: "200% auto" }}
          >
            Vinay
          </motion.span>{" "}
          <motion.span
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              transition: { 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 3
              }
            }}
            className="inline-block"
          >
            👋
          </motion.span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed drop-shadow-md font-light px-1"
        >
          I'm a passionate{" "}
          <span className="text-cyan-400 font-semibold relative">
            BlockChain Developer
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
              animate={{ scaleX: [0, 1], originX: "left" }}
              transition={{ duration: 1, delay: 1.5 }}
            />
          </span>{" "}
          and{" "}
          <span className="text-blue-400 font-semibold relative">
            Data Engineer
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
              animate={{ scaleX: [0, 1], originX: "left" }}
              transition={{ duration: 1, delay: 1.7 }}
            />
          </span>{" "}
          with a focus on building secure, scalable systems and solving real-world challenges through clean, efficient code.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col xs:flex-row space-y-3 xs:space-y-0 xs:space-x-3 sm:space-x-5 justify-center"
        >
          <motion.a
            href="/Vinay's_CV.pdf"
            download
            className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              animate={{
                x: ["100%", "-100%"]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 1.5,
                ease: "linear"
              }}
              style={{ opacity: 0.5 }}
            />
            <span className="relative flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </span>
          </motion.a>
          
          <motion.a
            href="#projects"
            className="relative overflow-hidden group border-2 border-blue-400 text-blue-400 hover:text-white px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="absolute inset-0 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"
              style={{ zIndex: -1 }}
            />
            <span className="relative flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              View Projects
            </span>
          </motion.a>
        </motion.div>
        
        {/* Stats counter */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-12 max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-xl mx-auto"
        >
          {[
            { value: "6+", label: "Months Experience" },
            { value: "15+", label: "Projects Completed" },
            { value: "2", label: " Private Blockchain Systems" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-2 sm:p-4 rounded-xl bg-white/5 backdrop-blur-lg"
              whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-300 text-xs sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Tech stack icons - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-16 sm:bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-3 sm:space-x-6 text-white/70 overflow-x-auto max-w-full px-2"
      >
        {["HyperLedger Fabric", "Mern Stack", "Python", "Azure", "AI/ML"].map((tech, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center flex-shrink-0"
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400 mb-1 sm:mb-2 opacity-70" />
            <span className="text-xs font-medium whitespace-nowrap">{tech}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Advanced pulsating down arrow with hover effect */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={handleScrollDown}
        whileHover={{ scale: 1.2 }}
        animate={{
          y: [0, 10, 0],
          opacity: hasScrolled ? 0 : 1
        }}
        transition={{
          y: { 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          },
          opacity: { duration: 0.3 }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>
    </motion.section>
  );
}