import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Awards.css';
import { TracingBeam } from '../ui/TracingBeam';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Awards = () => {
  const [activeAward, setActiveAward] = useState(null);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const awardsRef = useRef(null);
  const grantsRef = useRef(null);
  
  const awards = [
    {
      id: 1,
      year: 2022,
      title: "WearRAcon Innovation Challenge Award",
      organization: "WearRAcon Society, USA",
      description: "Head Motion Controlled Foldable Supplementary Robot Arm Exosuit for Construction Work: FSRA-Exosuit was selected as a finalist in WearRAcon Innovation Challenge Award-2022."
    },
    {
      id: 2,
      year: 2021,
      title: "James Dyson Design Award Finalist",
      organization: "Dyson Foundation, USA",
      description: "Deployable and foldable drone arm (DFRA) for Covid-19 medical supply and foldable robotic arm for collaborative work (FRAC) were selected as finalists."
    },
    {
      id: 3,
      year: 2021,
      title: "Creativity and Innovation Award",
      organization: "Korean Electrical Society, South Korea",
      description: "Awarded for 'Bird's Nest Removal Technology from Electric Poles Using Drone's Folding Robot Arm' with a prize money of $500."
    },
    {
      id: 4,
      year: 2021,
      title: "Samsung Electro-Mechanics Award",
      organization: "Korean Society of Electronic Engineering, South Korea",
      description: "Awarded for 'Foldable Drone Arm for stable Dust cleaning performance' with a prize money of $300."
    },
    {
      id: 5,
      year: 2018,
      title: "Demo runner-up in Asia Haptics Conference",
      organization: "Asia Haptics Conference, USA",
      description: "For 'A Novel Ferro-Fluid-based Fingertip Tactile Display for Concurrently Displaying Texture and Geometric Perception'."
    }
  ];
  
  const grants = [
    {
      id: 1,
      years: "2015",
      title: "Gandhian Young Technological Innovation Award",
      amount: "Presidential Recognition",
      agency: "President of India"
    },
    {
      id: 2,
      years: "2015",
      title: "Delhi Class of 89 Innovation Award",
      amount: "Finalist",
      agency: "IIT Delhi"
    },
    {
      id: 3,
      years: "2015",
      title: "Young Professional Engineering Award",
      amount: "Recognition",
      agency: "College of Technology Engineering, Udaipur"
    }
  ];
  
  useEffect(() => {
    // Create animated background elements
    const createParticles = () => {
      if (!sectionRef.current) return;
      
      // Clear any existing particles
      const existingParticles = document.querySelectorAll('.award-particle');
      existingParticles.forEach(p => p.remove());
      
      // Create gold/trophy particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('award-particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color (gold/trophy colors)
        const colors = ['#FFD700', '#FFC107', '#F9A825', '#F57F17', '#FF8F00'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.3 + 0.05;
        
        // Apply animations
        gsap.to(particle, {
          x: `${Math.random() * 200 - 100}`,
          y: `${Math.random() * 200 - 100}`,
          duration: Math.random() * 20 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        
        sectionRef.current.appendChild(particle);
      }
    };
    
    // Create glow effects
    const createGlowEffects = () => {
      if (!sectionRef.current) return;
      
      const glowsContainer = sectionRef.current;
      const colors = ['#FFD700', '#FFC107', '#F57F17'];
      
      for (let i = 0; i < 3; i++) {
        const glow = document.createElement('div');
        glow.classList.add('award-glow', `glow-${i+1}`);
        glow.style.backgroundColor = colors[i];
        glow.style.left = `${Math.random() * 80 + 10}%`;
        glow.style.top = `${Math.random() * 80 + 10}%`;
        
        glowsContainer.appendChild(glow);
        
        gsap.to(glow, {
          x: `random(-100, 100)`,
          y: `random(-100, 100)`,
          scale: `random(0.8, 1.5)`,
          duration: `random(15, 30)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };
    
    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
    
    tl.fromTo(
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
        ease: "power3.out"
      }
    ).fromTo(
      '.section-subtitle',
      { 
        x: -50, 
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out"
      },
      "-=0.5"
    );
    
    // Animate award items
    if (awardsRef.current) {
      const awardItems = awardsRef.current.querySelectorAll('.award-item');
      
      gsap.fromTo(
        awardItems,
        { 
          x: -80, 
          opacity: 0,
          rotateY: -15
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: awardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Add hover animations to award items
      awardItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.03,
            boxShadow: "0 15px 40px rgba(255, 215, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.3
          });
          
          // Animate the year badge
          gsap.to(item.querySelector('.award-year'), {
            scale: 1.1,
            backgroundColor: "#FFD700",
            duration: 0.3
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
            duration: 0.3
          });
          
          // Reset the year badge
          gsap.to(item.querySelector('.award-year'), {
            scale: 1,
            backgroundColor: "#0066cc",
            duration: 0.3
          });
        });
      });
    }
    
    // Animate grant items
    if (grantsRef.current) {
      const grantItems = grantsRef.current.querySelectorAll('.grant-item');
      
      gsap.fromTo(
        grantItems,
        { 
          y: 50, 
          opacity: 0,
          rotateX: 15
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: grantsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Add hover animations to grant items
      grantItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -10,
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(255, 215, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)",
            duration: 0.4
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
            duration: 0.4
          });
        });
      });
    }
    
    // Animate quote with glowing effect
    gsap.fromTo(
      '.awards-quote',
      { 
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.awards-quote',
          start: 'top 85%'
        }
      }
    );
    
    // Execute background effects
    createParticles();
    createGlowEffects();
    
    return () => {
      // Cleanup animations
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      const particles = document.querySelectorAll('.award-particle');
      particles.forEach(p => {
        gsap.killTweensOf(p);
        p.remove();
      });
      const glows = document.querySelectorAll('.award-glow');
      glows.forEach(g => {
        gsap.killTweensOf(g);
        g.remove();
      });
    };
  }, []);
  
  return (
    <section id="awards" className="awards-section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Awards & Recognition</h2>
        
        <h3 className="section-subtitle">Honors & Recognition</h3>
        <div className="awards-timeline" ref={awardsRef}>
          {awards.map(award => (
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
