import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMotion } from '../../contexts/MotionContext'; // Import the motion context
import './Education.css';

const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  // Use motion context to determine if we should animate
  const { shouldUseMotion, isMobile } = useMotion();
  
  // Timeline content refs for static rendering
  const timelineRef = useRef(null);

  useEffect(() => {
    if (inView && shouldUseMotion) {
      controls.start('visible');
    } else if (isMobile) {
      // Ensure everything is visible on mobile
      controls.set('staticVisible');
    }
  }, [controls, inView, shouldUseMotion, isMobile]);

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
    staticVisible: {
      opacity: 1,
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
    staticVisible: {
      y: 0,
      opacity: 1,
    }
  };

  // Education timeline data
  const educationTimeline = [
    {
      id: 1,
      years: "2017-2021",
      degree: "Ph.D. in Mechatronics Engineering (Wearable Robotics)",
      institution: "Korea University of Technology & Education, South Korea",
      details: "Thesis: Design and Analysis of Twisted String Actuators for Exoskeleton Applications"
    },
    {
      id: 2,
      years: "2015-2017",
      degree: "Masters in Design Engineering",
      institution: "Indian Institute of Technology Delhi, India",
      details: "Thesis: Inchworm Mechanism for Solar Panel Cleaning Robot"
    },
    {
      id: 3,
      years: "2011-2015",
      degree: "Bachelors in Mechanical Engineering",
      institution: "RTU Rajasthan, India",
      details: "Graduated with First Division Honors"
    }
  ];

  // Research experience data
  const researchExperience = [
    {
      id: 1,
      years: "2021-2023",
      position: "Post-Doctoral Research Fellow",
      institution: "Khalifa University & KAIST, UAE & South Korea",
      details: "Research on Foldable Robot Arms for Drones and Haptic Interfaces for VR/AR Applications"
    },
    {
      id: 2,
      years: "2019-2020",
      position: "Visiting Research Scholar",
      institution: "DGIST (Daegu Gyeongbuk Institute of Science), South Korea",
      details: "Research on Bio-inspired Robot Design and Soft Robotics"
    },
    {
      id: 3,
      years: "2015-2016",
      position: "Research Assistant",
      institution: "Indian Institute of Technology Delhi, India",
      details: "Developed Innovative Mechanisms for Agricultural Robotics"
    }
  ];

  // Component to conditionally render motion elements
  const SafeMotionSection = ({ children, variants, className, ...props }) => {
    return shouldUseMotion ? (
      <motion.section 
        className={className} 
        variants={variants}
        {...props}>
        {children}
      </motion.section>
    ) : (
      <section className={`${className} no-motion`}>
        {children}
      </section>
    );
  };

  const SafeMotionDiv = ({ children, variants, className, ...props }) => {
    return shouldUseMotion ? (
      <motion.div 
        className={className} 
        variants={variants}
        {...props}>
        {children}
      </motion.div>
    ) : (
      <div className={`${className} no-motion`}>
        {children}
      </div>
    );
  };

  return (
    <section id="education" className="education-section" ref={ref}>
      <div className="section-container">
        <h2 className="section-title">Education & Research Experience</h2>
        
        <SafeMotionSection
          className="education-timeline"
          ref={timelineRef}
          variants={containerVariants}
          initial={shouldUseMotion ? "hidden" : "staticVisible"}
          animate={controls}
        >
          <div className="timeline-line"></div>
          
          <div className="timeline-container education">
            <h3 className="timeline-title">Education</h3>
            
            {educationTimeline.map(edu => (
              <SafeMotionDiv
                key={edu.id}
                className="timeline-item"
                variants={itemVariants}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content education-content">
                  <div className="timeline-years">{edu.years}</div>
                  <h4 className="timeline-heading">{edu.degree}</h4>
                  <div className="timeline-institution">{edu.institution}</div>
                  <p className="timeline-details">{edu.details}</p>
                </div>
              </SafeMotionDiv>
            ))}
          </div>
          
          <div className="timeline-container research">
            <h3 className="timeline-title">Research Experience</h3>
            
            {researchExperience.map(exp => (
              <SafeMotionDiv
                key={exp.id}
                className="timeline-item"
                variants={itemVariants}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content research-content">
                  <div className="timeline-years">{exp.years}</div>
                  <h4 className="timeline-heading">{exp.position}</h4>
                  <div className="timeline-institution">{exp.institution}</div>
                  <p className="timeline-details">{exp.details}</p>
                </div>
              </SafeMotionDiv>
            ))}
          </div>
        </SafeMotionSection>
      </div>
      
      {/* Background decoration elements */}
      <div className="education-bg-circle circle-1"></div>
      <div className="education-bg-circle circle-2"></div>
      <div className="education-bg-circle circle-3"></div>
    </section>
  );
};

export default Education;