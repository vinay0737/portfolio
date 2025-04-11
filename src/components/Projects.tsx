import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const projects = [
    {
      title: "Blockchain-Based Warehouse Product Traceability",
      tech: ["Hyperledger Fabric", "React.js", "Kubernetes", "Docker", "CouchDB", "Node.js", "TypeScript"],
      desc: "Built for Reliance to track 1M+ product records in real-time across 2 orgs and 3 nodes, supporting 100K+ transactions. Developed a React.js dashboard for seamless tracking.",
      color: "#3b82f6", // blue
      image: "/blockchain.png",
      links: {
        github: "#",
        live: "#",
      },
      highlights: [
        "Implemented chaincode with complex access control logic",
        "Designed a scalable network architecture with multiple channels",
        "Created real-time data synchronization between blockchain and frontend",
        "Optimized query performance by 40% using CouchDB indexes"
      ]
    },
    {
      title: "Re-Identification System",
      tech: ["Python", "OpenCV", "Deep Learning", "TensorFlow", "PyTorch"],
      desc: "Achieved 95% accuracy in tracking identities using feature-matching and deep learning. Reduced false positives by 30% and optimized performance for edge deployment.",
      color: "#10b981", // green
      image: "/sentinel.png",
      links: {
        github: "#",
        paper: "#",
      },
      highlights: [
        "Trained custom neural network for person identification",
        "Implemented real-time video processing pipeline",
        "Reduced model size by 60% without sacrificing accuracy",
        "Developed custom evaluation metrics for tracking performance"
      ]
    },
    {
      title: "Social Media Automation Bot",
      tech: ["Node.js", "Express.js", "Passport.js", "MongoDB", "OAuth", "Redis"],
      desc: "Automated 500+ daily posts, likes, and comments. Integrated OAuth login and rate-limit handling, boosting efficiency by 30% for over 1000 users.",
      color: "#8b5cf6", // purple
      image: "/bot.png",
      links: {
        github: "#",
        demo: "#",
      },
      highlights: [
        "Built RESTful API with comprehensive authentication flow",
        "Implemented rate limiting and caching with Redis",
        "Created dynamic scheduling system for automated posts",
        "Developed analytics dashboard for user engagement metrics"
      ]
    },
    {
      title: "MongoDB-Powered AI Agent",
      tech: ["Node.js", "LangChain", "MongoDB Atlas", "OpenAI API", "Express.js"],
      desc: "Built an intelligent agent capable of answering natural language queries by reasoning over data stored in MongoDB.",
      color: "#10b981", // emerald green
      image: "/mongo.png",
      links: {
        github: "#",
        report: "#",
      },
      highlights: [
        "Integrated LangChain with MongoDB Atlas for seamless document querying",
        "Used OpenAI’s GPT models to generate context-aware responses",
        "Implemented memory for conversation continuity using vector embeddings",
        "Achieved real-time answers with sub-second latency for FAQs and business insights"
      ]
    }
,    
  ];

  const toggleProject = (index: number) => {
    setActiveProject(activeProject === index ? null : index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.05
      }
    }),
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
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
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.1 + i * 0.05
      }
    })
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 to-slate-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 inline-block">
            Featured Projects
          </h2>
          <div className="h-1 w-24 mx-auto mt-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of my technical work showcasing my skills and problem-solving approach across different domains.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <motion.div
                initial={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                whileHover={{ 
                  boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${project.color}30`
                }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 h-full"
                style={{ borderTop: `4px solid ${project.color}` }}
                onClick={() => toggleProject(i)}
              >
                {/* Image and overlay */}
                <motion.div 
                  variants={imageVariants}
                  className="relative h-48 overflow-hidden"
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"
                  ></div>
                  {/* Tech tags overlay - show only a few */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech, t) => (
                      <motion.span
                        key={t}
                        variants={chipVariants}
                        custom={t}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-gray-800/80 text-gray-200 backdrop-blur-sm border border-gray-700"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 3 && (
                      <motion.span
                        variants={chipVariants}
                        custom={3}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-gray-800/80 text-gray-400 backdrop-blur-sm border border-gray-700"
                      >
                        +{project.tech.length - 3} more
                      </motion.span>
                    )}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-3">
                      {project.links.github && (
                        <a href={project.links.github} className="text-gray-400 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {(project.links.live || project.links.demo) && (
                        <a href={project.links.live || project.links.demo} className="text-gray-400 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                    
                    <button 
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); toggleProject(i); }}
                    >
                      <span>{activeProject === i ? "Less details" : "More details"}</span>
                      <motion.div
                        animate={{ rotate: activeProject === i ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>
                  </div>

                  <AnimatePresence>
                    {activeProject === i && (
                      <motion.div
                        key={`details-${i}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={detailsVariants}
                        className="mt-4 pt-4 border-t border-gray-700"
                      >
                        <h4 className="font-medium text-white mb-2">Technical Highlights</h4>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight, h) => (
                            <motion.li
                              key={h}
                              variants={itemVariants}
                              className="flex items-start text-gray-300 text-sm"
                            >
                              <div className="mr-3 mt-1 flex-shrink-0">
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: project.color }}
                                ></div>
                              </div>
                              <p>{highlight}</p>
                            </motion.li>
                          ))}
                        </ul>
                        
                        <div className="mt-4">
                          <h4 className="font-medium text-white mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, t) => (
                              <motion.span
                                key={t}
                                custom={t}
                                variants={chipVariants}
                                className="px-3 py-1 rounded-full text-xs font-medium border border-gray-700"
                                style={{ 
                                  backgroundColor: `${project.color}15`, 
                                  color: `${project.color}dd`
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress indicator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredProject === i ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-1 w-full origin-left"
                  style={{ background: `linear-gradient(to right, ${project.color}, transparent)` }}
                ></motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;