import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Collaborations.css';

// Do not register ScrollTrigger here - it's already registered in App.jsx

const Collaborations = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Collaboration data
  const collaborations = [
    {
      id: 1,
      name: "IIT Delhi",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/1200px-Indian_Institute_of_Technology_Delhi_Logo.svg.png",
      description: "Collaborative research on advanced robotic systems and AI applications.",
      website: "https://home.iitd.ac.in/"
    },
    {
      id: 2,
      name: "KAIST",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/KAIST_logo.svg/1200px-KAIST_logo.svg.png",
      description: "Joint projects on haptic interfaces and wearable robotics technologies.",
      website: "https://www.kaist.ac.kr/en/"
    },
    {
      id: 3,
      name: "Khalifa University",
      logo: "https://www.ku.ac.ae/wp-content/themes/ku-2022-child/img/logo.svg",
      description: "Research partnership on drone manipulators and aerial robotics.",
      website: "https://www.ku.ac.ae/"
    },
    {
      id: 4,
      name: "ISRO",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/800px-Indian_Space_Research_Organisation_Logo.svg.png",
      description: "Collaboration on spacecraft docking and space robotics applications.",
      website: "https://www.isro.gov.in/"
    },
    {
      id: 5,
      name: "BMVSS (Jaipur Foot)",
      logo: "https://jaipurfoot.org/images/logo.png",
      description: "Developing affordable prosthetic solutions for amputees in partnership with this NGO.",
      website: "https://www.jaipurfoot.org/"
    },
    {
      id: 6,
      name: "DRDO",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/DRDO_Logo.svg/800px-DRDO_Logo.svg.png",
      description: "Joint research on exoskeleton technologies and defense applications.",
      website: "https://www.drdo.gov.in/"
    }
  ];

  useEffect(() => {
    // Exit early if we're missing dependencies
    if (!sectionRef.current || !gsap || !ScrollTrigger) return;

    const animationTimeout = setTimeout(() => {
      try {
        // Animate the title
        gsap.fromTo(
          '.collab-title',
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

        // Animate the subtitle
        gsap.fromTo(
          '.collab-subtitle',
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%'
            }
          }
        );

        // Animate cards with staggered effect
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.collab-card');
          gsap.fromTo(
            cards,
            {
              y: 50,
              opacity: 0,
              scale: 0.9
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 80%'
              }
            }
          );
        }
      } catch (error) {
        console.error('Error in Collaborations animations:', error);
      }
    }, 100);

    // Clean up animations
    return () => {
      clearTimeout(animationTimeout);
      try {
        if (ScrollTrigger && sectionRef.current) {
          // Find all ScrollTrigger instances related to this component
          const sectionTriggers = ScrollTrigger.getAll().filter(trigger => {
            // Check if trigger element is within our section or matches our selectors
            const triggerElement = trigger.vars.trigger;
            
            if (triggerElement instanceof Element) {
              return sectionRef.current.contains(triggerElement);
            }
            
            if (typeof triggerElement === 'string') {
              return triggerElement.includes('collab');
            }
            
            return false;
          });
          
          // Kill those triggers
          sectionTriggers.forEach(trigger => {
            if (trigger && trigger.kill) {
              trigger.kill();
            }
          });
        }
      } catch (error) {
        console.error('Error cleaning up ScrollTrigger:', error);
      }
    };
  }, []);

  const handleCardHover = (id) => {
    setHoveredCard(id);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section id="collaborations" className="collaborations-section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title collab-title">Research Collaborations</h2>
        <p className="collab-subtitle">Proudly working with leading institutions and organizations to advance the frontier of robotics and AI research.</p>
        
        <div className="collab-grid" ref={cardsRef}>
          {collaborations.map((collab) => (
            <div 
              className={`collab-card ${hoveredCard === collab.id ? 'hovered' : ''}`}
              key={collab.id}
              onMouseEnter={() => handleCardHover(collab.id)}
              onMouseLeave={handleCardLeave}
            >
              <div className="collab-logo-container">
                <img src={collab.logo} alt={`${collab.name} logo`} className="collab-logo" />
              </div>
              <div className="collab-content">
                <h3 className="collab-name">{collab.name}</h3>
                <p className="collab-description">{collab.description}</p>
                <div className="collab-button-container">
                  <a 
                    href={collab.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="collab-button"
                  >
                    Visit Website
                    <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="card-shine"></div>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        <div className="collab-footer">
          <p>Interested in collaborating with our research group?</p>
          <a href="#contact" className="collab-contact-button">Get in Touch</a>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="collab-bg-decoration collab-glow-1"></div>
      <div className="collab-bg-decoration collab-glow-2"></div>
      <div className="collab-bg-decoration collab-glow-3"></div>
    </section>
  );
};

export default Collaborations;
