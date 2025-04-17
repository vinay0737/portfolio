import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function About() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  const skillBadgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const skills = [
    "JavaScript", "React", "Node.js", "MongoDB", "C++", "Azure", "DSA", 
    "Computer Vision", "Machine Learning", "HTML", "CSS", "SQL"
  ];

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 opacity-80"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 right-10 w-28 sm:w-40 h-28 sm:h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-24 sm:w-36 h-24 sm:h-36 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 text-white"
      >
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center mb-8 sm:mb-12"
        >
          <div className="hidden sm:block h-px w-8 md:w-12 bg-blue-400 mr-4"></div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              About Me
            </span>
          </h2>
          <div className="hidden sm:block h-px w-8 md:w-12 bg-blue-400 ml-4"></div>
        </motion.div>

        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-lg border border-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl">
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
            <p className="text-lg sm:text-xl leading-relaxed text-gray-100">
              I'm <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Vinay Vekkuluri</span>, 
              a solution-oriented full-stack developer passionate about crafting elegant, high-performance applications that solve real-world problems.
            </p>
            
            <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
              <h3 className="text-base sm:text-lg font-medium text-gray-200 mb-3">Core Expertise</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    variants={skillBadgeVariants}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/80 border border-gray-700 rounded-full text-xs sm:text-sm font-medium text-blue-300"
                    custom={index}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-gray-300">
              With strong foundations in <span className="font-medium text-green-400">C++, Data Structures & Algorithms, and Database Systems</span>, 
              I bring a comprehensive approach to software development that balances technical excellence with business needs.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-gray-300">
              My current professional focus is on building scalable distributed systems using 
              <span className="font-medium text-purple-300"> Kubernetes, Istio, and Terraform</span>, while enhancing frontend experiences with 
              <span className="font-medium text-cyan-300"> TypeScript and Next.js</span>.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-4 border-t border-gray-800">
              <p className="text-xs sm:text-sm md:text-base text-gray-400 italic">
                "My philosophy is to write clean, maintainable code that scales with both technical requirements and team collaboration."
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants} 
          className="mt-6 sm:mt-8 text-center"
        >
          <p className="text-xs sm:text-sm text-gray-400">
            Let's connect and build something amazing together.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}