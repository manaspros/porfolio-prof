import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PointerHighlight } from '../ui/PointerHighlight';
import { researchTopics } from '../../data/research';
import './Research.css';

const Research = () => {
  const sectionRef = useRef(null);
  const animationsInitialized = useRef(false);

  useEffect(() => {
    // Prevent duplicate initialization
    if (animationsInitialized.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const researchItems = section.querySelectorAll('.research-item');
    const titleElement = section.querySelector('.section-title3');
    const ctaElement = section.querySelector('.research-cta');

    // Mark as initialized
    animationsInitialized.current = true;

    // Kill any existing animations for this section first
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id && trigger.vars.id.includes('research-')) {
        trigger.kill();
      }
    });

    // Create title animation
    let titleTl = null;
    if (titleElement) {
      titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleElement,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
          id: 'research-title-animation',
          markers: false
        }
      });

      titleTl.fromTo(
        titleElement,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }

    // Create individual timelines for research items
    const itemTimelines = [];
    researchItems.forEach((item, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
          id: `research-item-animation-${index}`,
          markers: false
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
      );

      const icon = item.querySelector('.research-icon');
      const title = item.querySelector('h3');
      const description = item.querySelector('p');
      const keywords = item.querySelector('.research-keywords');

      if (icon) {
        tl.fromTo(
          icon,
          { scale: 0.5, opacity: 0, rotation: -30 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.5 },
          "-=0.4"
        );
      }

      if (title) {
        tl.fromTo(
          title,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        );
      }

      if (description) {
        tl.fromTo(
          description,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.2"
        );
      }

      if (keywords) {
        tl.fromTo(
          keywords,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        );
      }

      itemTimelines.push(tl);
    });

    // Animate CTA section
    let ctaTl = null;
    if (ctaElement) {
      ctaTl = gsap.fromTo(
        ctaElement,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaElement,
            start: 'top 80%',
            id: 'research-cta-animation'
          }
        }
      );
    }

    // Cleanup function
    return () => {
      animationsInitialized.current = false;

      // Kill title timeline
      if (titleTl) titleTl.kill();

      // Kill item timelines
      itemTimelines.forEach(tl => tl.kill());

      // Kill CTA timeline
      if (ctaTl) ctaTl.kill();

      // Kill all research-related ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id && trigger.vars.id.includes('research-')) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="research" className="research-section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title3">Research</h2>
        <div className="research-grid">
          {researchTopics.map((topic) => (
            <div className="research-item" key={topic.id}>
              <div className="research-icon">{topic.icon}</div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <div className="research-keywords">
                {topic.keywords.map((keyword, index) => (
                  <span key={index}>{keyword}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

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
