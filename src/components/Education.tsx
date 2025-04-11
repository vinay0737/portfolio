import { useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Education() {
  const [activeSchool, setActiveSchool] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const educationData = [
    {
      school: "National Institute of Technology, Rourkela",
      degree: "B.Tech in Biotechnology",
      period: "2021 - Present",
      grade: "CGPA: 7.60 / 10.00",
      courses: ["Data Structures and Algorithms", "Database Management Systems", "Operating Systems", "Object-Oriented Programming"],
      color: "#3b82f6",
      icon: "🎓",
      achievements: [
        "Active member of the Programming Club, participating in coding competitions",
        "Developed multiple full-stack applications for campus events",
        "Research assistant for a bioinformatics project using machine learning"
      ]
    },
    {
      school: "Narayana Junior College, Kurnool",
      degree: "Intermediate (MPC)",
      period: "March 2020",
      grade: "Percentage: 91.7%",
      color: "#8b5cf6",
      icon: "🔬",
      achievements: [
        "Ranked in the top 1% of students in state-level examinations",
        "Achieved top ranks in College Exams"
      ]
    },
    {
      school: "AP Model School, Markapuram",
      degree: "Matriculation",
      period: "May 2018",
      grade: "CGPA: 9.7 / 10.00",
      color: "#ec4899",
      icon: "📚",
      achievements: [
        "School topper in Mathematics",
        "Achieved a national scholarship",
        "Mandal-level winner in science exhibition"
      ]
    }
  ];

  // Start animations when component comes into view
  if (isInView) {
    controls.start("visible");
  }

  const toggleSchool = (index: number) => {
    setActiveSchool(activeSchool === index ? null : index);
  };

  // Animation variants
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

  const timelineVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.8
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
        damping: 15,
        stiffness: 100,
        delay: i * 0.1
      }
    })
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

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 inline-block">
            Academic Journey
          </h2>
          <div className="h-1 w-20 mx-auto mt-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            My educational background that has shaped my technical foundation and problem-solving approach.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="relative"
        >
          {/* Timeline Line */}
          <motion.div 
            variants={timelineVariants}
            className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full hidden sm:block"
          ></motion.div>

          {/* Education Cards */}
          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={cardVariants}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="hidden sm:block absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 -mt-2">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.8 + index * 0.2
                    }}
                    style={{ backgroundColor: edu.color }}
                    className="w-6 h-6 rounded-full border-4 border-gray-900 flex items-center justify-center text-lg shadow-lg"
                  >
                    <span className="text-xs">{edu.icon}</span>
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div 
                  className={`ml-0 sm:ml-8 md:ml-0 sm:w-5/6 md:w-5/12 ${
                    index % 2 === 0 ? "md:ml-auto" : ""
                  } relative`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    initial={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
                    whileHover={{ 
                      boxShadow: `0 8px 30px rgba(0,0,0,0.3)`
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/90 backdrop-blur-lg rounded-xl overflow-hidden cursor-pointer border border-gray-700"
                    style={{ borderLeft: `4px solid ${edu.color}` }}
                    onClick={() => toggleSchool(index)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-white">
                          {edu.school}
                        </h3>
                        <span 
                          className="px-3 py-1 text-xs rounded-full font-medium"
                          style={{ backgroundColor: `${edu.color}20`, color: edu.color }}
                        >
                          {edu.period}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 mt-1 font-medium">
                        {edu.degree}
                      </p>
                      
                      <div className="mt-3 flex items-center">
                        <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: edu.color }}></div>
                        <p className="text-gray-300 text-sm">
                          {edu.grade}
                        </p>
                      </div>

                      {index === 0 && (
                        <div className="mt-3">
                          <p className="text-gray-400 text-sm">
                            <span className="text-gray-300 font-medium">Key Courses:</span> {edu.courses.join(", ")}
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm text-gray-400">
                          {activeSchool === index ? "Click to collapse" : "Click to expand"}
                        </p>
                        <motion.div
                          animate={{ rotate: activeSchool === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Expanded Details */}
                      {activeSchool === index && (
                        <motion.div 
                          initial="hidden"
                          animate="visible"
                          variants={detailsVariants}
                          className="mt-4 pt-4 border-t border-gray-700"
                        >
                          <h4 className="text-gray-200 font-medium mb-2">Key Achievements</h4>
                          <ul className="space-y-2">
                            {edu.achievements.map((achievement, i) => (
                              <motion.li 
                                key={i}
                                variants={itemVariants}
                                className="flex items-start text-gray-300 text-sm"
                              >
                                <span className="mr-2 mt-1">•</span>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Bottom highlight indicator */}
                    <motion.div 
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ 
                        scaleX: activeSchool === index ? 1 : 0,
                        opacity: activeSchool === index ? 1 : 0
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-1 w-full origin-left"
                      style={{ background: `linear-gradient(to right, ${edu.color}, transparent)` }}
                    ></motion.div>
                  </motion.div>
                  
                  {/* Date indicator for timeline (visible on larger screens) */}
                  <div className="hidden md:block absolute top-6 text-sm font-medium text-gray-400">
                    {index % 2 === 0 ? (
                      <div className="right-full mr-8">{edu.period}</div>
                    ) : (
                      <div className="left-full ml-8">{edu.period}</div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}