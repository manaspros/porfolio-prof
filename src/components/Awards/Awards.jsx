import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { awards, grants } from '../../data/awards';
import './Awards.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Awards = () => {
  const [activeAward, setActiveAward] = useState(null);
  const [showMoreAwards, setShowMoreAwards] = useState(false);
  const [buttonPulse, setButtonPulse] = useState(false);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const awardsRef = useRef(null);
  const grantsRef = useRef(null);
  const particlesRef = useRef([]);
  const glowsRef = useRef([]);
  
  // Get the awards to display based on showMore state
  const displayedAwards = showMoreAwards ? awards : awards.slice(0, 5);
  
  useEffect(() => {
    // Store all animations for proper cleanup
    const animations = [];
    const particles = [];
    const glows = [];
    
    // Create animated background elements with better performance
    const createParticles = () => {
      if (!sectionRef.current) return;
      
      // Clear any existing particles first
      particlesRef.current.forEach(p => {
        if (p && p.parentNode) {
          p.parentNode.removeChild(p);
        }
      });
      particlesRef.current = [];
      
      // Create fewer particles for better performance (20 instead of 30)
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('award-particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random size (slightly smaller for better performance)
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Fewer color options for more consistent look
        const colors = ['#FFD700', '#FFC107', '#F57F17'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Use more subtle opacity
        particle.style.opacity = Math.random() * 0.2 + 0.05;
        
        // Use less extreme random values for more subtle movement
        const xMove = Math.random() * 100 - 50;
        const yMove = Math.random() * 100 - 50;
        const duration = Math.random() * 15 + 20;
        
        // Store animation for cleanup
        const anim = gsap.to(particle, {
          x: xMove,
          y: yMove,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        
        animations.push(anim);
        particles.push(particle);
        particlesRef.current.push(particle);
        sectionRef.current.appendChild(particle);
      }
    };
    
    // Create glow effects with better performance
    const createGlowEffects = () => {
      if (!sectionRef.current) return;
      
      // Clear any existing glows first
      glowsRef.current.forEach(g => {
        if (g && g.parentNode) {
          g.parentNode.removeChild(g);
        }
      });
      glowsRef.current = [];
      
      const glowsContainer = sectionRef.current;
      const colors = ['#FFD700', '#FFC107', '#F57F17'];
      
      // Create only 3 glow elements for better performance
      for (let i = 0; i < 3; i++) {
        const glow = document.createElement('div');
        glow.classList.add('award-glow', `glow-${i+1}`);
        glow.style.backgroundColor = colors[i];
        
        // Fixed positions rather than random ones
        const positions = [
          { left: '75%', top: '15%' },
          { left: '15%', top: '75%' },
          { left: '60%', top: '40%' }
        ];
        
        glow.style.left = positions[i].left;
        glow.style.top = positions[i].top;
        
        // Use more subtle animation ranges
        const anim = gsap.to(glow, {
          x: i % 2 === 0 ? 50 : -50,
          y: i % 2 === 0 ? 50 : -50,
          scale: 1 + (i * 0.1),
          duration: 15 + (i * 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        
        animations.push(anim);
        glows.push(glow);
        glowsRef.current.push(glow);
        glowsContainer.appendChild(glow);
      }
    };
    
    // Main animation timeline with better performance settings
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        // Prevent duplicate animations
        once: false
      }
    });
    
    // Store timeline for cleanup
    timelineRef.current = tl;
    
    // Animate title and subtitle with simplified animations
    tl.fromTo(
      '.section-title',
      { 
        y: 30, 
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    ).fromTo(
      '.section-subtitle',
      { 
        x: -30, 
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.4"
    );
    
    // Animate award items with better performance
    if (awardsRef.current) {
      const awardItems = awardsRef.current.querySelectorAll('.award-item');
      
      const awardAnim = gsap.fromTo(
        awardItems,
        { 
          x: -50, 
          opacity: 0,
          rotateY: 0 // Remove 3D rotation for better performance
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          stagger: 0.1, // Reduce stagger time
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: awardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
      
      animations.push(awardAnim);
      
      // Simplify hover animations and store for cleanup
      awardItems.forEach((item) => {
        // Create one-time GSAP instances for hover animations
        const hoverIn = gsap.to(item, {
          scale: 1.03,
          boxShadow: "0 15px 40px rgba(255, 215, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          paused: true
        });
        
        const hoverOut = gsap.to(item, {
          scale: 1,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          paused: true
        });
        
        // Add event listeners that play the animations
        const handleMouseEnter = () => {
          hoverIn.restart();
          
          // Animate the year badge separately
          gsap.to(item.querySelector('.award-year'), {
            scale: 1.1,
            backgroundColor: "#FFD700",
            duration: 0.3
          });
        };
        
        const handleMouseLeave = () => {
          hoverOut.restart();
          
          // Reset the year badge
          gsap.to(item.querySelector('.award-year'), {
            scale: 1,
            backgroundColor: "#0066cc",
            duration: 0.3
          });
        };
        
        item.addEventListener('mouseenter', handleMouseEnter);
        item.addEventListener('mouseleave', handleMouseLeave);
        
        // Store for cleanup
        animations.push(hoverIn, hoverOut);
        
        // Store event listeners for cleanup
        item._gsapMouseEnter = handleMouseEnter;
        item._gsapMouseLeave = handleMouseLeave;
      });
    }
    
    // Animate grant items with better performance
    if (grantsRef.current) {
      const grantItems = grantsRef.current.querySelectorAll('.grant-item');
      
      const grantAnim = gsap.fromTo(
        grantItems,
        { 
          y: 30, 
          opacity: 0,
          rotateX: 0 // Remove 3D rotation for better performance
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1, // Reduce stagger time
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grantsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
      
      animations.push(grantAnim);
      
      // Simplify hover animations for grants
      grantItems.forEach((item) => {
        // Create one-time GSAP instances for hover animations
        const hoverIn = gsap.to(item, {
          y: -5, // Less extreme movement
          scale: 1.03, // Reduced scale effect
          boxShadow: "0 15px 30px rgba(255, 215, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          paused: true
        });
        
        const hoverOut = gsap.to(item, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          paused: true
        });
        
        // Add event listeners that play the animations
        const handleMouseEnter = () => hoverIn.restart();
        const handleMouseLeave = () => hoverOut.restart();
        
        item.addEventListener('mouseenter', handleMouseEnter);
        item.addEventListener('mouseleave', handleMouseLeave);
        
        // Store for cleanup
        animations.push(hoverIn, hoverOut);
        
        // Store event listeners for cleanup
        item._gsapMouseEnter = handleMouseEnter;
        item._gsapMouseLeave = handleMouseLeave;
      });
    }
    
    // Animate quote with simpler effect
    const quoteAnim = gsap.fromTo(
      '.awards-quote',
      { 
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.awards-quote',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    animations.push(quoteAnim);
    
    // Execute background effects
    createParticles();
    createGlowEffects();
    
    // Add pulse animation to button when the section is visible
    const pulseButton = () => {
      if (awardsRef.current && buttonPulse === false) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setButtonPulse(true);
              observer.disconnect();
            }
          });
        }, { threshold: 0.5 });
        
        observer.observe(awardsRef.current);
      }
    };
    
    pulseButton();
    
    // Comprehensive cleanup function
    return () => {
      console.log("Cleaning up awards animations");
      
      // Kill all animations
      animations.forEach(anim => {
        if (anim && anim.kill) anim.kill();
      });
      
      // Kill timeline if it exists
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      
      // Kill all ScrollTriggers
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger && 
              sectionRef.current && 
              sectionRef.current.contains(trigger.vars.trigger)) {
            trigger.kill();
          }
        });
      }
      
      // Remove event listeners from award items
      if (awardsRef.current) {
        const awardItems = awardsRef.current.querySelectorAll('.award-item');
        awardItems.forEach(item => {
          if (item._gsapMouseEnter) item.removeEventListener('mouseenter', item._gsapMouseEnter);
          if (item._gsapMouseLeave) item.removeEventListener('mouseleave', item._gsapMouseLeave);
        });
      }
      
      // Remove event listeners from grant items
      if (grantsRef.current) {
        const grantItems = grantsRef.current.querySelectorAll('.grant-item');
        grantItems.forEach(item => {
          if (item._gsapMouseEnter) item.removeEventListener('mouseenter', item._gsapMouseEnter);
          if (item._gsapMouseLeave) item.removeEventListener('mouseleave', item._gsapMouseLeave);
        });
      }
      
      // Remove particles from DOM
      particles.forEach(p => {
        if (p && p.parentNode) {
          p.parentNode.removeChild(p);
        }
      });
      
      // Remove glows from DOM
      glows.forEach(g => {
        if (g && g.parentNode) {
          g.parentNode.removeChild(g);
        }
      });
    };
  }, []);
  
  // Toggle function to show/hide more awards
  const toggleMoreAwards = () => {
    setShowMoreAwards(prevState => !prevState);
    
    // Animate the newly displayed awards when they appear
    if (!showMoreAwards) {
      // Small delay to allow DOM update
      setTimeout(() => {
        const newItems = document.querySelectorAll('.award-item:nth-child(n+6)');
        if (newItems.length > 0) {
          gsap.fromTo(
            newItems,
            { 
              x: -50, 
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out"
            }
          );
        }
      }, 50);
    }
  };
  
  return (
    <section id="awards" className="awards-section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Awards</h2>
        
        <h3 className="section-subtitle">Honors & Recognition</h3>
        <div className="awards-timeline" ref={awardsRef}>
          {displayedAwards.map(award => (
            <div 
              className="award-item" 
              key={award.id}
              onMouseEnter={() => setActiveAward(award.id)}
              onMouseLeave={() => setActiveAward(null)}
            >
              <div className="award-year">{award.year}</div>
              <div className="award-content">
                <h4 className="award-title">{award.title}</h4>
                <div className="award-org">{award.organization}</div>
                <p className="award-description">{award.description}</p>
                <div className={`award-shine ${activeAward === award.id ? 'active' : ''}`}></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Read more button */}
        {awards.length > 5 && (
          <div className="read-more-container">
            <button 
              className={`read-more-btn ${showMoreAwards ? 'active' : ''} ${buttonPulse ? 'pulse' : ''}`} 
              onClick={toggleMoreAwards}
            >
              {showMoreAwards 
                ? <>Show Less <span className="arrow-icon">↑</span></>
                : <>Show More Awards <span className="award-count">({awards.length - 5})</span> <span className="arrow-icon">↓</span></>
              }
            </button>
          </div>
        )}
        
        <h3 className="section-subtitle grants-subtitle">Grants & Other Recognitions</h3>
        <div className="grants-container" ref={grantsRef}>
          {grants.map(grant => (
            <div className="grant-item" key={grant.id}>
              <div className="grant-amount">{grant.amount}</div>
              <div className="grant-details">
                <h4 className="grant-title">{grant.title}</h4>
                <div className="grant-agency">{grant.agency}</div>
                <div className="grant-years">{grant.years}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="awards-quote">
          <blockquote>
            "My journey from robot artist to roboticist has been driven by a passion for creating innovative solutions
            that can assist humans and address real-world challenges."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Awards;
