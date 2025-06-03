import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Education.css';

// Try to use motion context but provide fallbacks if it fails
let useMotion;
try {
  // Dynamically import to avoid crashes if missing
  useMotion = require('../../contexts/MotionContext').useMotion;
} catch (e) {
  console.warn('MotionContext not available, using fallback');
  // Provide fallback implementation
  useMotion = () => ({ shouldUseMotion: false, isMobile: false });
}

const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Use motion context with error handling
  const { shouldUseMotion = false, isMobile = false } =
    typeof useMotion === 'function' ? useMotion() : { shouldUseMotion: false, isMobile: false };

  // Timeline content refs for static rendering
  const timelineRef = useRef(null);

  // Track window size to handle resizing
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Add a state to ensure content visibility
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Handle window resize events
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Force content to be visible after a timeout
    const visibilityTimeout = setTimeout(() => {
      setContentVisible(true);
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(visibilityTimeout);
    };
  }, []);

  useEffect(() => {
    // Always set content visible after component mount
    setContentVisible(true);

    try {
      if (inView) {
        if (shouldUseMotion && !isMobile) {
          controls.start('visible');
        } else {
          // For mobile or when animations shouldn't be used
          controls.set('staticVisible');
        }
      } else {
        // If not in view yet, ensure content will be visible
        setTimeout(() => {
          controls.set('staticVisible');
        }, 1500);
      }
    } catch (error) {
      console.error("Animation error:", error);
      // Fall back to static content if animation fails
      controls.set('staticVisible');
    }

  }, [controls, inView, shouldUseMotion, isMobile, windowWidth]);

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
        duration: 0.5,
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
      years: "2023-Present",
      position: "Assistant Professor",
      institution: "Indian Institute of Technology Jodhpur (IITJ), India",
      details: "Teaching and training on Tele-Robotics, Development of Novel Robotic Sixth Finger for Assisting Hemiplegic Patients"
    },
    {
      id: 2,
      years: "2021-2023",
      position: "Post-doctoral Researcher",
      institution: "Khalifa University, United Arab Emirates",
      details: "Research on TSA-based robotic fingers, adaptive grippers, and Supernumerary Robotic Limbs for hemiplegic patients"
    },
    {
      id: 3,
      years: "2020-2021",
      position: "Post-doctoral Researcher",
      institution: "Chungnam National University, Republic of Korea",
      details: "Design of deployable aerial manipulators and supplementary robot arms for construction assistance"
    }
  ];

  // Component to conditionally render motion elements with safety checks
  const SafeMotionSection = ({ children, variants, className, ...props }) => {
    // Only use motion if explicitly enabled and animations are supported
    if (shouldUseMotion && !isMobile && typeof motion !== 'undefined') {
      try {
        return (
          <motion.section
            className={`${className} ${isMobile ? 'mobile-view' : ''} ${contentVisible ? 'content-visible' : ''}`}
            variants={variants}
            {...props}>
            {children}
          </motion.section>
        );
      } catch (error) {
        console.error("Error rendering motion section:", error);
        // Fall back to static rendering
        return (
          <section className={`${className} no-motion ${isMobile ? 'mobile-view' : ''} ${contentVisible ? 'content-visible' : ''}`}>
            {children}
          </section>
        );
      }
    }

    // Default to static rendering
    return (
      <section className={`${className} no-motion ${isMobile ? 'mobile-view' : ''} ${contentVisible ? 'content-visible' : ''}`}>
        {children}
      </section>
    );
  };

  const SafeMotionDiv = ({ children, variants, className, ...props }) => {
    // Only use motion if explicitly enabled and animations are supported
    if (shouldUseMotion && !isMobile && typeof motion !== 'undefined') {
      try {
        return (
          <motion.div
            className={`${className} ${isMobile ? 'mobile-view' : ''} ${contentVisible ? 'content-visible' : ''}`}
            variants={variants}
            {...props}>
            {children}
          </motion.div>
        );
      } catch (error) {
        console.error("Error rendering motion div:", error);
        // Fall back to static rendering
        return (
          <div className={`${className} no-motion ${isMobile ? 'mobile-view' : ''} ${contentVisible ? 'content-visible' : ''}`}>
            {children}
          </div>
        );
      }
    }

    // Default to static rendering
    return (
      <div className={`${className} no-motion ${isMobile ? 'mobile-view' : ''} ${contentVisible ? 'content-visible' : ''}`}>
        {children}
      </div>
    );
  };

  return (
    <section id="education" className={`education-section ${isMobile ? 'mobile-view' : ''} ${contentVisible ? 'content-visible' : ''}`} ref={ref}>
      <div className="edu-container">
        <h2 className="edu-section-title">Education & Research Experience</h2>

        <div className="timelines-container">
          {/* Education Timeline */}
          <SafeMotionSection
            className="education-timeline timeline-block"
            ref={timelineRef}
            variants={containerVariants}
            initial={shouldUseMotion && !isMobile ? "hidden" : "staticVisible"}
            animate={controls}
          >
            <h3 className="timeline-heading-title education-heading">Education</h3>
            <div className="main-timeline-line education-line"></div>

            <div className={`timeline-container education ${isMobile ? 'mobile-layout' : ''}`}>
              {educationTimeline.map((edu, index) => (
                <SafeMotionDiv
                  key={edu.id}
                  className={`timeline-item ${isMobile ? 'mobile-item' : index % 2 === 0 ? 'left-item' : 'right-item'}`}
                  variants={itemVariants}
                >
                  <div className="timeline-marker">
                    <div className="marker-dot education-dot"></div>
                    {!isMobile && <div className="timeline-connector"></div>}
                  </div>
                  <div className="timeline-content education-content">
                    <div className="timeline-years education-years">{edu.years}</div>
                    <h4 className="timeline-item-heading">{edu.degree}</h4>
                    <div className="timeline-institution">{edu.institution}</div>
                    <p className="timeline-details">{edu.details}</p>
                  </div>
                </SafeMotionDiv>
              ))}
            </div>
          </SafeMotionSection>

          {/* Research Timeline */}
          <SafeMotionSection
            className="research-timeline timeline-block"
            variants={containerVariants}
            initial={shouldUseMotion && !isMobile ? "hidden" : "staticVisible"}
            animate={controls}
          >
            <h3 className="timeline-heading-title research-heading">Research Experience</h3>
            <div className="main-timeline-line research-line"></div>

            <div className={`timeline-container research ${isMobile ? 'mobile-layout' : ''}`}>
              {researchExperience.map((exp, index) => (
                <SafeMotionDiv
                  key={exp.id}
                  className={`timeline-item ${isMobile ? 'mobile-item' : index % 2 === 0 ? 'left-item' : 'right-item'}`}
                  variants={itemVariants}
                >
                  <div className="timeline-marker research-marker">
                    <div className="marker-dot research-dot"></div>
                    {!isMobile && <div className="timeline-connector"></div>}
                  </div>
                  <div className="timeline-content research-content">
                    <div className="timeline-years research-years">{exp.years}</div>
                    <h4 className="timeline-item-heading">{exp.position}</h4>
                    <div className="timeline-institution">{exp.institution}</div>
                    <p className="timeline-details">{exp.details}</p>
                  </div>
                </SafeMotionDiv>
              ))}
            </div>
          </SafeMotionSection>
        </div>
      </div>

      {/* Background decoration elements - simplified for mobile */}
      <div className={`education-bg-circle circle-1 ${isMobile ? 'reduced-opacity' : ''}`}></div>
      <div className={`education-bg-circle circle-2 ${isMobile ? 'reduced-opacity' : ''}`}></div>
      <div className={`education-bg-circle circle-3 ${isMobile ? 'reduced-opacity' : ''}`}></div>
    </section>
  );
};

export default Education;