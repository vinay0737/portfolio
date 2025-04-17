import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      role: "Blockchain Developer Intern - Neophyte",
      duration: "Jan 2025 – Present",
      company: "Neophyte",
      logo: "/neophyte.png",
      color: "#3b82f6", // blue
      brief:
        "Built a scalable permissioned blockchain network using Hyperledger Fabric and optimized deployments with Docker and Kubernetes.",
      details: [
        "Built a permissioned blockchain network handling 100+ transactions/sec ensuring data integrity and transparency.",
        "Orchestrated 50+ blockchain nodes using Kubernetes, improving scalability by 25%.",
        "Containerized services with Docker, cutting deployment time by 30%.",
        "Integrated 10+ smart contracts for supply chain traceability, enhancing efficiency by 40%.",
      ],
      technologies: ["Hyperledger Fabric", "Docker", "Kubernetes", "Smart Contracts", "Go"]
    },
    {
      role: "Node.js Developer Intern - Celebal Technologies",
      duration: "May 2024 – Jul 2024",
      company: "Celebal Technologies",
      logo: "/celebal.png",
      color: "#10b981", // green
      brief:
        "Developed a social media automation app with secure OAuth integration, serving over 1,000 users.",
      details: [
        "Built a social media automation app using Node.js and Express.js, automating 500+ posts, likes, and comments daily.",
        "Implemented OAuth authentication with Passport.js to ensure secure logins for 1,000+ users.",
        "Optimized automation logic using async operations and rate-limiting, improving efficiency by 30%.",
      ],
      technologies: ["Node.js", "Express.js", "MongoDB", "Passport.js", "OAuth"]
    },
  ];

  const handleExperienceClick = (index: number) => {
    if (selectedExperience === index) {
      setSelectedExperience(null);
    } else {
      setSelectedExperience(index);
      // Scroll to the selected experience if not in viewport
      if (containerRef.current) {
        setTimeout(() => {
          const element = document.getElementById(`experience-${index}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const chipVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.4
      }
    })
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 md:w-64 h-40 md:h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 -left-20 md:-left-32 w-64 md:w-96 h-64 md:h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 right-1/4 w-56 md:w-80 h-56 md:h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 inline-block pb-2">
            Professional Experience
          </h2>
          <div className="h-1 w-20 mx-auto mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A journey through my professional roles and achievements, highlighting key projects and technical expertise.
          </p>
        </motion.div>

        <motion.div 
          ref={containerRef}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 md:space-y-8"
        >
          {experiences.map(({ role, duration, company, logo, color, brief, details, technologies }, i) => (
            <motion.div
              id={`experience-${i}`}
              key={i}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <motion.div
                initial={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                whileHover={{ boxShadow: `0 8px 30px rgba(0,0,0,0.15), 0 0 0 1px ${color}30` }}
                transition={{ duration: 0.3 }}
                className={`
                  bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-xl overflow-hidden
                  border border-gray-200 dark:border-gray-700
                  ${selectedExperience === i ? 'ring-2' : ''}
                `}
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)", borderLeft: `4px solid ${color}` }}
                onClick={() => handleExperienceClick(i)}
                onMouseEnter={() => setHoveredExperience(i)}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div 
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <img src={logo} alt={company} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      </div>
                    </div>
                    <div className="flex-grow w-full">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-100 group-hover:text-blue-600 break-words">
                          {role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span 
                            className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium" 
                            style={{ backgroundColor: `${color}15`, color }}
                          >
                            {duration}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                        {brief}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedExperience === i && (
                      <motion.div
                        key={`details-${i}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={detailsVariants}
                        className="mt-5 pt-5 sm:mt-6 sm:pt-6 border-t border-gray-200 dark:border-gray-700"
                      >
                        <h4 className="font-semibold text-base sm:text-lg text-gray-700 dark:text-gray-200 mb-3">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {details.map((detail, j) => (
                            <motion.li 
                              key={j}
                              variants={itemVariants}
                              custom={j}
                              className="flex items-start"
                            >
                              <div className="mr-3 mt-1.5 flex-shrink-0">
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: color }}
                                ></div>
                              </div>
                              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{detail}</p>
                            </motion.li>
                          ))}
                        </ul>

                        <div className="mt-5 sm:mt-6">
                          <h4 className="font-semibold text-base sm:text-lg text-gray-700 dark:text-gray-200 mb-3">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, t) => (
                              <motion.span
                                key={t}
                                variants={chipVariants}
                                custom={t}
                                className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 sm:mt-6 flex justify-end">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedExperience(null);
                            }}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
                          >
                            <span>Collapse</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover indicator */}
                  <div 
                    className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-300 ease-in-out ${hoveredExperience === i ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
                  ></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;