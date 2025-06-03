import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import googleScholarService from '../../services/googleScholarService';
import { heroData } from '../../data/heroData';
import './Hero.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const animationsInitialized = useRef(false);
  const [scholarStats, setScholarStats] = useState({
    papers: heroData.stats.papers.defaultValue,
    journals: '0',
    patents: heroData.stats.patents.defaultValue
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Google Scholar stats
  useEffect(() => {
    const fetchScholarStats = async () => {
      try {
        // Use the existing service to fetch publications
        const publications = await googleScholarService.fetchPublications(heroData.scholar.userId);
        const stats = await googleScholarService.getPublicationStats(publications);

        // Update state with the fetched stats
        setScholarStats({
          papers: publications.length.toString(),
          journals: stats.journalCount.toString(),
          patents: heroData.stats.patents.defaultValue // Keep static value for patents
        });
      } catch (error) {
        console.error('Error fetching scholar stats for hero section:', error);
        // Fallback values remain in place
      } finally {
        setIsLoading(false);
      }
    };

    fetchScholarStats();
  }, []);

  // Animation effect
  useEffect(() => {
    // Prevent duplicate initialization
    if (animationsInitialized.current || !gsap) return;

    animationsInitialized.current = true;

    // Kill any existing hero animations first
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id === 'hero-animations') {
        trigger.kill();
      }
    });

    // Check if device is mobile for conditional animations
    const isMobile = window.innerWidth <= 768;

    const tl = gsap.timeline();

    // Simplified animations for mobile
    if (isMobile) {
      // Simpler animations for mobile to prevent display issues
      tl.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
        .to('.hero-image', {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out'
        }, "-=0.4")
        .to('.hero-cta', {
          opacity: 1,
          y: 0,
          duration: 0.5
        }, "-=0.3");
    } else {
      // Original animations for desktop
      // Create timeline for hero animations with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%', // Start when the top of hero section is 80% into the viewport
          end: 'bottom 20%',
          toggleActions: 'play none none reverse', // Play on enter, reverse on leave
          id: 'hero-animations' // Add ID for easier debugging
        },
        defaults: {
          ease: "power3.out",
          overwrite: 'auto', // Prevent animation conflicts
          clearProps: 'transform' // Clean up after animations
        }
      });

      // Animate hero content elements
      tl.fromTo(
        '.hero-greeting',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          '.hero-name',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          '.hero-title',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          '.hero-description',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          '.hero-stats',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          '.cta-buttons',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          '.image-container',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2 },
          "-=1.2"
        )
        .fromTo(
          '.floating-element',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
          "-=0.6"
        )
        .fromTo(
          '.scroll-indicator',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        );
    }

    // Clean up function
    return () => {
      animationsInitialized.current = false;
      if (tl) tl.kill();
      // Kill any ScrollTrigger instances specific to this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'hero-animations') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      {/* Background elements */}
      <div className="hero-bg"></div>
      <div className="blur-bg blur-1"></div>
      <div className="blur-bg blur-2"></div>

      <div className="hero-container">
        <div className="hero-content" ref={contentRef}>
          <div className="hero-greeting">{heroData.personal.greeting}</div>
          <h1 className="hero-name">{heroData.personal.name}</h1>
          <h2 className="hero-title">
            {heroData.personal.title}, <span className="text-gradient">{heroData.personal.titleHighlight}</span>
          </h2>
          <p className="hero-description">
            {heroData.personal.description}
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">
                {isLoading ?
                  <span className="loading-placeholder"></span> :
                  scholarStats.papers
                }
              </span>
              <span className="stat-label">{heroData.stats.papers.label}</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">
                {heroData.stats.robots.value}
              </span>
              <span className="stat-label">{heroData.stats.robots.label}</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">
                {isLoading ?
                  <span className="loading-placeholder"></span> :
                  scholarStats.patents
                }
              </span>
              <span className="stat-label">{heroData.stats.patents.label}</span>
            </div>
          </div>

          <div className="cta-buttons">
            <a href={heroData.cta.primary.link} className="btn primary">
              <span>{heroData.cta.primary.text}</span>
            </a>
            <a href={heroData.cta.secondary.link} className="btn secondary">
              <span>{heroData.cta.secondary.text}</span>
            </a>
          </div>
        </div>

        <div className="hero-image" ref={imageRef}>
          <div className="image-container">
            <div className="image-border"></div>
            <div className="profile-image" style={{ backgroundImage: `url('${heroData.personal.profileImage}')` }}></div>
            <div className="image-pattern"></div>
          </div>

          <div className="floating-element floating-chip">
            <div className="chip-icon">{heroData.floatingElements.chip.icon}</div>
            <div className="chip-text">{heroData.floatingElements.chip.text}</div>
          </div>

          <div className="floating-element floating-shape">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 0L60 30L30 60L0 30L30 0Z" fill="url(#paint0_linear)" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#623CEA" />
                  <stop offset="1" stopColor="#FF7D54" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <div className="scroll-text">{heroData.scrollIndicator.text}</div>
      </div>
    </section>
  );
};

export default Hero;
