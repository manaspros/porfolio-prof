import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import only, don't register
import { PointerHighlight } from '../ui/PointerHighlight';
import './About.css';
import about from '../../assets/about.jpeg';

// REMOVE THIS LINE: gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  
  useEffect(() => {
    // Create separate timelines for title and content with their own triggers
    
    // Title animation with more specific trigger settings
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 75%', 
        end: 'top 25%',
        toggleActions: 'play none none reverse',
        id: 'about-title-animation',
        markers: false, // Remove this in production
        once: false // Allow re-triggering as user scrolls up/down
      }
    });

    titleTl.fromTo(
      titleRef.current, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: 'power3.out'
      }
    );
    
    // Content animation with more specific trigger
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%', // More specific start point
        end: 'center 30%', // More specific end point 
        toggleActions: 'play none none reverse',
        id: 'about-content-animation',
        markers: false // Remove this in production
      }
    });
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
    contentTl.fromTo(
      contentRef.current, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2,
        ease: 'power3.out'
      }
    );

    // Clean up all animations and ScrollTrigger instances
    return () => {
      if (titleTl) titleTl.kill();
      if (contentTl) contentTl.kill();
      
      // Kill specific ScrollTrigger instances
      const aboutTriggers = ScrollTrigger.getAll().filter(trigger => 
        trigger.vars.id === 'about-title-animation' || 
        trigger.vars.id === 'about-content-animation'
      );
      
      aboutTriggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title3" ref={titleRef}>About</h2>
        <div className="about-content" ref={contentRef}>
          <div className="about-image">
            <img src={about} alt="Dr. Bhivraj Suthar" />
          </div>
          <div className="about-text">
            <h3>
              <PointerHighlight
                rectangleClassName="about-highlight-rectangle"
                pointerClassName="about-highlight-pointer"
                containerClassName="about-highlight-container"
              >
                Assistant Professor, Next-Gen BIRD Lab
              </PointerHighlight>
            </h3>
            <p>
              Dr. Suthar is working as an Assistant Professor at the School of Artificial Intelligence and Data Science at IIT Jodhpur, India. 
              He is also associated with the Next-Gen BIRD Lab, focusing on Bio-inspired Robotics and Artificial Intelligence research.
            </p>
            <p>
              With a Ph.D. in Wearable Robotics from Korea University of Technology and Education, Dr. Suthar has over 5 years of experience in Academia and Industrial Research across South Korea, UAE, and India. Before joining IIT Jodhpur, he was a Postdoctoral research fellow at the Robotic Centre at Khalifa University (UAE) and Korea Advanced Institute of Science and Technology (KAIST).
            </p>
            <p>
              Dr. Suthar's journey is encapsulated in the phrase "Robot artist to Roboticist." His passion for robotics ignited during childhood, leading to a remarkable career with over 15 innovative robots developed in-house and 7 patents. He has received the prestigious Prime Minister Early Career Research Grant Award and has secured research funding of more than 2 crore INR.
            </p>
            <div className="about-stats">
              <div className="stat-item experience-stat">
                <span className="stat-number">5+</span>
                <span className="stat-desc">Years Research Experience</span>
              </div>
              <div className="stat-item international-stat">
                <span className="stat-heading">International Experience</span>
                <div className="country-flags">
                  <div className="country-flag">
                    <div className="flag-icon south-korea"></div>
                    <span>South Korea</span>
                  </div>
                  <div className="country-flag">
                    <div className="flag-icon australia"></div>
                    <span>Australia</span>
                  </div>
                  <div className="country-flag">
                    <div className="flag-icon uae"></div>
                    <span>UAE</span>
                  </div>
                  <div className="country-flag">
                    <div className="flag-icon usa"></div>
                    <span>USA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-links">
              <a href="#research" className="about-link">Research Interests</a>
              <a href="#publications" className="about-link">Key Publications</a>
              <a href="#contact" className="about-link">Collaboration Opportunities</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
