import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PointerHighlight } from '../ui/PointerHighlight';
import { aboutData } from '../../data/about';
import './About.css';
import about from '../../assets/about.jpg';

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
        <h2 className="section-title3" ref={titleRef}>{aboutData.title}</h2>
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
                {aboutData.subtitle}
              </PointerHighlight>
            </h3>
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <div className="about-stats">
              <div className="stat-item experience-stat">
                <span className="stat-number">{aboutData.stats.experience.value}</span>
                <span className="stat-desc">{aboutData.stats.experience.label}</span>
              </div>
              <div className="stat-item international-stat">
                <span className="stat-heading">{aboutData.stats.international.heading}</span>
                <div className="country-flags">
                  {aboutData.stats.international.countries.map((country, index) => (
                    <div className="country-flag" key={index}>
                      <div className={`flag-icon ${country.flagClass}`}></div>
                      <span>{country.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-links">
              {aboutData.links.map((link, index) => (
                <a href={link.href} className="about-link" key={index}>{link.text}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
