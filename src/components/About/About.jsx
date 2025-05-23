import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import only, don't register
import { PointerHighlight } from '../ui/PointerHighlight';
import './About.css';

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
        <h2 className="section-title" ref={titleRef}>About Me</h2>
        <div className="about-content" ref={contentRef}>
          <div className="about-image">
            <img src="https://static.wixstatic.com/media/fbe72c_def032ed0f264c089c4938788bdc67d7~mv2.jpg/v1/crop/x_60,y_10,w_534,h_1215/fill/w_322,h_784,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Raj1_JPG.jpg" alt="Dr. Bhivraj Suthar" />
          </div>
          <div className="about-text">
            <h3>
              <PointerHighlight
                rectangleClassName="about-highlight-rectangle"
                pointerClassName="about-highlight-pointer"
                containerClassName="about-highlight-container"
              >
                Assistant Professor, Roboticist
              </PointerHighlight>
            </h3>
            <p>
              Dr. Suthar is working as an Assistant Professor at the School of Artificial Intelligence and Data Science at IIT Jodhpur, India. 
              He is also associated with Robotics & Mobility Systems, IIT Jodhpur & AIIMS MedTech Centre. Before joining IIT Jodhpur, 
              he was a Postdoctoral research fellow at the Robotic Centre at Khalifa University (UAE), Korea Advanced Institute of Science 
              and Technology (Korea), Chungnam National University (Korea) and IIT Delhi (India).
            </p>
            <p>
              Dr. Suthar embarked on a transformative life journey encapsulated in the phrase "Robot artist to Roboticist." 
              His passion for robotics ignited during his childhood, where he devoted his energies to developing Robotic systems. 
              Over the years, he has carved an impressive track record, successfully developing over 15 innovative robots in-house and holding 7 patents.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">8+</span>
                <span className="stat-desc">Years Research</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-desc">Robots Developed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">7</span>
                <span className="stat-desc">Patents</span>
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
