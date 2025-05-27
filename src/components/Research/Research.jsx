import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import only, don't register
import { PointerHighlight } from '../ui/PointerHighlight';
import './Research.css';

const Research = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const researchItems = document.querySelectorAll('.research-item');
    
    // Create a specific timeline for the research section title with better settings
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.section-title3'),
        start: 'top 75%',
        end: 'top 25%',
        toggleActions: 'play none none reverse',
        id: 'research-title-animation',
        markers: false // Remove this in production
      }
    });
    
    titleTl.fromTo(
      sectionRef.current.querySelector('.section-title3'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    );
        gsap.fromTo(
      '.section-title3',
      { 
        y: 50, 
        opacity: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      }
    );
    
    // Enhanced staggered animation for research items with individual triggers
    researchItems.forEach((item, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%', // More specific start point
          end: 'bottom 15%', // More specific end point
          toggleActions: 'play none none reverse',
          id: `research-item-animation-${index}`,
          markers: false // Remove this in production
        }
      });
      
      tl.fromTo(
        item,
        { 
          y: 80, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out"
        }
      ).fromTo(
        item.querySelector('.research-icon'),
        { scale: 0.5, opacity: 0, rotation: -30 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5 },
        "-=0.4"
      ).fromTo(
        item.querySelector('h3'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      ).fromTo(
        item.querySelector('p'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2"
      ).fromTo(
        item.querySelector('.research-keywords'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.3"
      );
    });
    
    // Animate the CTA section
    gsap.fromTo(
      '.research-cta',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.research-cta',
          start: 'top 80%'
        }
      }
    );
    
    // Improved cleanup function
    return () => {
      if (titleTl) titleTl.kill();
      
      // Kill all ScrollTrigger instances related to this component
      const researchTriggers = ScrollTrigger.getAll().filter(trigger => 
        (trigger.vars.id && trigger.vars.id.includes('research-')) || 
        (trigger.vars.trigger && sectionRef.current && sectionRef.current.contains(trigger.vars.trigger))
      );
      
      researchTriggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="research" className="research-section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title3">Research</h2>
        <div className="research-grid">
          <div className="research-item">
            <div className="research-icon">🦾</div>
            <h3>Bio-inspired Mechanisms & Actuators</h3>
            <p>Developing bio-inspired robotic systems and actuation mechanisms that mimic natural movement patterns for increased efficiency and adaptability.</p>
            <div className="research-keywords">
              <span>Twisted String Actuators</span>
              <span>Soft Robotics</span>
              <span>Biomimetic Design</span>
            </div>
          </div>
          
          <div className="research-item">
            <div className="research-icon">🤖</div>
            <h3>Supernumerary Robotic Limbs</h3>
            <p>Designing additional robotic limbs and assistive devices to enhance human capabilities and provide support for various tasks.</p>
            <div className="research-keywords">
              <span>Sixth Robotic Finger</span>
              <span>Third Robotic Arm</span>
              <span>Assistive Technologies</span>
            </div>
          </div>
          
          <div className="research-item">
            <div className="research-icon">🦿</div>
            <h3>Exoskeletons & Exosuits</h3>
            <p>Creating wearable robotic systems for rehabilitation, assistive support, and performance enhancement in industrial and medical applications.</p>
            <div className="research-keywords">
              <span>Upper Limb Exoskeletons</span>
              <span>Soft Exosuits</span>
              <span>Rehabilitation Robotics</span>
            </div>
          </div>
          
          <div className="research-item">
            <div className="research-icon">🔍</div>
            <h3>Sensing Technologies</h3>
            <p>Developing advanced tactile, vision-based, and multi-modal sensing systems for improved robot-environment interaction.</p>
            <div className="research-keywords">
              <span>Tactile Sensing</span>
              <span>Vision-based Sensing</span>
              <span>Haptic Feedback</span>
            </div>
          </div>
          
          <div className="research-item">
            <div className="research-icon">🚁</div>
            <h3>Aerial Manipulation</h3>
            <p>Researching metamorphic drone arms and aerial manipulators for applications in infrastructure inspection, disaster response, and delivery.</p>
            <div className="research-keywords">
              <span>Foldable Drone Arms</span>
              <span>Aerial Grippers</span>
              <span>Metamorphic Mechanisms</span>
            </div>
          </div>
          
          <div className="research-item">
            <div className="research-icon">🧠</div>
            <h3>AI in Robotics</h3>
            <p>Integrating artificial intelligence techniques to enhance robot control, autonomy, and human-robot interaction for more effective collaboration.</p>
            <div className="research-keywords">
              <span>Brain-Computer Interface</span>
              <span>Machine Learning</span>
              <span>Adaptive Control</span>
            </div>
          </div>
        </div>
        
        {/* Add the missing research-cta section */}
        <div className="research-cta">
          <h3>Interested in Collaboration?</h3>
          <p>Reach out to discuss potential research partnerships or learn more about our ongoing projects.</p>
          <a href="#contact" className="cta-button">Contact for Research</a>
        </div>
      </div>
    </section>
  );
};

export default Research;
