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
        trigger: sectionRef.current.querySelector('.section-title'),
        start: 'top 75%',
        end: 'top 25%',
        toggleActions: 'play none none reverse',
        id: 'research-title-animation',
        markers: false // Remove this in production
      }
    });
    
    titleTl.fromTo(
      sectionRef.current.querySelector('.section-title'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    );
        gsap.fromTo(
      '.section-title',
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

  const researchAreas = [
    {
      id: 1,
      title: "Soft Actuators",
      description: "The conventional actuators used in exosuit make it more challenging for researchers and engineers to design compact, lightweight, and wearable systems. My work focuses on developing lightweight, compliant, fully portable, comfortable, energy-efficient and powerful ",
      highlightedText: "soft twisted string actuator systems (TSAs)",
      highlightClass: "bg-blue-highlight border-blue",
      highlightColor: "text-blue-500",
      restDescription: ".",
      icon: "🔄",
      keywords: ["Robotics", "Actuation", "Biomechanics"]
    },
    {
      id: 2,
      title: "Exoskeleton and Exosuit",
      description: "The wearable exoskeleton and exosuit are paving the way toward robotic abilities that are vital for various applications including assistance, rehabilitation, telemanipulation, and human-machine interaction. I am designing and developing ",
      highlightedText: "comfortable, fully portable, compact exosuit",
      highlightClass: "bg-purple-highlight border-purple",
      highlightColor: "text-purple-500",
      restDescription: ".",
      icon: "🦾",
      keywords: ["Assistive Technology", "Rehabilitation", "Medical Robotics"]
    },
    {
      id: 3,
      title: "Metamorphic Drone Arm",
      description: "The ",
      highlightedText: "reconfigurable and deployable drone arm with gripper technology",
      highlightClass: "bg-orange-highlight border-orange",
      highlightColor: "text-orange-500",
      restDescription: " has enormous potential for solving real-world challenges. It can perform activities in hazardous environments and be controlled remotely, offering vital solutions for parcel delivery, inspection, gripping, and aerial manipulation.",
      icon: "🚁",
      keywords: ["Aerial Robotics", "Manipulation", "Reconfigurable Systems"]
    }
  ];

  return (
    <section id="research" className="research-section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Research Areas</h2>
        <div className="research-grid">
          {researchAreas.map(area => (
            <div className="research-item" key={area.id}>
              <div className="research-icon">{area.icon}</div>
              <h3>{area.title}</h3>
              <p>
                {area.description}
                <PointerHighlight
                  rectangleClassName={area.highlightClass}
                  pointerClassName={area.highlightColor}
                  containerClassName="inline-block mx-1"
                >
                  <span className="relative z-10">{area.highlightedText}</span>
                </PointerHighlight>
                {area.restDescription}
              </p>
              <div className="research-keywords">
                {area.keywords.map((keyword, idx) => (
                  <span key={idx}>{keyword}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="research-cta">
          <h3>Current Research Projects</h3>
          <p>
            My lab is currently working on several  
            <PointerHighlight
              rectangleClassName="bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700"
              pointerClassName="text-purple-500"
              containerClassName="inline-block mx-1"
            >
              <span className="relative z-10 px-2"> innovative projects</span>
            </PointerHighlight>
            related to these research areas.
            We're always looking for talented students and collaborators to join our efforts at the School of Artificial Intelligence and Data Science at IIT Jodhpur.
          </p>
          <a href="#contact" className="research-button">Collaborate with Us</a>
        </div>
      </div>
    </section>
  );
};

export default Research;
