import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collaborations } from '../../data/collaborations';
import './Collaborations.css';

// Do not register ScrollTrigger here - it's already registered in App.jsx

const Collaborations = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [theme, setTheme] = useState('light');

  // Theme detection effect
  useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    const currentTheme = document.documentElement.getAttribute('data-theme') || savedTheme;
    setTheme(currentTheme);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Exit early if we're missing dependencies
    if (!sectionRef.current || !gsap || !ScrollTrigger) return;

    const animationTimeout = setTimeout(() => {
      try {
        // Animate the title
        gsap.fromTo(
          '.collab-title2',
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
    <section
      id="collaborations"
      className={`collaborations-section ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
      ref={sectionRef}
    >
      <div className="section-container">
        <h2 className="collab-title2">Collaborations</h2>
        <p className="collab-subtitle">Proudly working with leading institutions and organizations to advance the frontier of robotics and AI research.</p>

        <div className="collab-grid" ref={cardsRef}>
          {collaborations.map((collab) => (
            <div
              className={`collab-card ${hoveredCard === collab.id ? 'hovered' : ''} ${theme === 'dark' ? 'dark-card' : 'light-card'}`}
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
                      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          <a href="#contact" className={`collab-contact-button ${theme === 'dark' ? 'dark-button' : 'light-button'}`}>Get in Touch</a>
        </div>
      </div>

      {/* Background decorations */}
      <div className={`collab-bg-decoration collab-glow-1 ${theme === 'dark' ? 'dark-glow' : 'light-glow'}`}></div>
      <div className={`collab-bg-decoration collab-glow-2 ${theme === 'dark' ? 'dark-glow' : 'light-glow'}`}></div>
      <div className={`collab-bg-decoration collab-glow-3 ${theme === 'dark' ? 'dark-glow' : 'light-glow'}`}></div>
    </section>
  );
};

export default Collaborations;
