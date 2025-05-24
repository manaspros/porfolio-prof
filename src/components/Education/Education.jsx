import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Education.css';

const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const educationItems = [
    {
      degree: "PhD (Applied Physics)",
      institution: "Department of Physics, JNV University, Jodhpur",
      year: "2020",
      description: "Thesis: Effect of Synthesis Method on the Preparation of Nanocrystalline Materials and Their Structural, Electrical and Magnetic Properties"
    },
    {
      degree: "M.Sc. (Physics with specialization in Electronics)",
      institution: "Department of Physics, Mohanlal Sukhadia University, Udaipur",
      year: "2011",
      description: "First Division"
    },
    {
      degree: "B.Sc. (Physics, Mathematics, Computer Science)",
      institution: "Mohanlal Sukhadia University, Udaipur",
      year: "2009",
      description: "First Division"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="education" className="education-section">
      <h2 className="section-title">Education</h2>
      <motion.div
        className="education-timeline"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {educationItems.map((item, index) => (
          <motion.div 
            className={`education-item ${index % 2 === 0 ? 'left' : 'right'}`}
            key={index}
            variants={itemVariants}
          >
            <div className="timeline-marker">
              <div className="timeline-dot"></div>
              <div className="timeline-year">{item.year}</div>
            </div>
            <div className="education-card">
              <div className="card-header">
                <h3 className="degree-title">{item.degree}</h3>
                <div className="institution-badge">
                  <svg className="education-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                  </svg>
                </div>
              </div>
              <h4 className="institution-name">{item.institution}</h4>
              <p className="description">{item.description}</p>
            </div>
          </motion.div>
        ))}
        <div className="timeline-line"></div>
      </motion.div>
    </section>
  );
};

export default Education;