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
      degree: "Ph.D. (Wearable Robotics, Mechanical Engineering)",
      institution: "Korea University of Technology and Education, Republic of Korea",
      year: "2020",
      description: "Research Fellow, IRIS Lab, Korea Advanced Institute of Science and Technology (KAIST), Republic of Korea.\nThesis: Design and Development of TSA Soft Actuator for Exosuit\nSupervisor: Professor Jee Hwan Ryu, IRIS Lab, KAIST, Republic of Korea\nCourses: Applied Robotics, Haptics and Telerobotics System, Advanced Signal Processing, Advanced Data Analysis, Modeling and Control, Non-linear Control System, Mechanical Behaviour of Materials and Microsystem Design."
    },
    {
      degree: "M.Tech. (Cleaning Robotics, Center for Energy Studies)",
      institution: "Indian Institute of Technology Delhi, India (48th QS Rank in Engineering and Technology)",
      year: "2015",
      description: "Thesis: Development of an Inchworm Mechanism for Solar Panel Cleaning Robot\nSupervisor: Professor Viresh Dutta (Supervisor, Center for Energy Studies) and Professor Sudipto Mukherjee (Co-Supervisor, Department of Mechanical Engineering)"
    },
    {
      degree: "B.E. (Mechatronics, Electrical Engineering)",
      institution: "College of Technology and Engineering (CTAE), Rajasthan, India",
      year: "2010",
      description: ""
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
              <p className="description">{item.description.split('\n').map((text, i) => (
                <React.Fragment key={i}>
                  {text}
                  <br />
                </React.Fragment>
              ))}</p>
            </div>
          </motion.div>
        ))}
        <div className="timeline-line"></div>
      </motion.div>
    </section>
  );
};

export default Education;