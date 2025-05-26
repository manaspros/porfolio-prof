import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Awards.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Awards = () => {
  const [activeAward, setActiveAward] = useState(null);
  const [showMoreAwards, setShowMoreAwards] = useState(false);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const awardsRef = useRef(null);
  const grantsRef = useRef(null);
  const particlesRef = useRef([]);
  const glowsRef = useRef([]);
  
  // Combined array of all awards
  const allAwards = [
    {
      id: 1,
      year: 2022,
      title: "WearRAcon Innovation Challenge Award Finalist",
      organization: "WearRAcon Society, USA",
      description: "Head Motion Controlled Foldable Supplementary Robot Arm Exosuit for Construction Work: FSRA-Exosuit was selected as a finalist in WearRAcon Innovation Challenge Award-2022."
    },
    {
      id: 2,
      year: 2021,
      title: "James Dyson Design Award Finalist",
      organization: "Dyson Foundation, USA",
      description: "Twisted Scissor Mechanism-based Foldable Aerial Manipulator was selected as one of the top ten projects nationwide in the James Dyson Design Award-2021, Republic of Korea."
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
      title: "Asia Haptics Demo Finalist",
      organization: "Asia Haptics Conference, USA",
      description: "A Novel FerroFluid-based Fingertip Tactile Display for Concurrently Displaying Texture and Geometric Perception was selected as a finalist for a Demo in Asia Haptics-2018, San Francisco, USA."
    },
    {
      id: 6,
      year: 2024,
      title: "Technical Session Chair",
      organization: "Advances in Robotics (AIR), IIT Jodhpur",
      description: "Member of Technical Session Chair in Advances in Robotics (AIR) biennial international conferences organized by The Robotics Society during 2-5 July, 2024."
    },
    {
      id: 7,
      year: 2024,
      title: "Technical Program Committee Member",
      organization: "ICEFEET-2024, NIT Patna",
      description: "Member of Technical Program Committee in the 4th International Conference on Emerging Frontiers in Electrical and Electronic Technologies during 21-23, November 2024."
    },
    {
      id: 8,
      year: 2024,
      title: "Workshop Delegate",
      organization: "DEBEL (DRDO), Bengaluru",
      description: "Delegate in the Workshop 'Emerging Technologies and Challenges for Exoskeleton' on 16-17 April 2024."
    },
    {
      id: 9,
      year: 2023,
      title: "Faculty Advisor",
      organization: "ISRO Robotic Challenge",
      description: "Faculty advisor of the 'IIT Jodhpur Robotics team' for ISRO Robotic Challenge-URSC, successfully clearing the first round of the competition."
    },
    {
      id: 10,
      year: 2015,
      title: "Gandhian Young Technological Innovation Award",
      organization: "President of India",
      description: "Received award by the PRESIDENT OF INDIA for the innovation idea 'Inchworm Mechanism for solar panel cleaning robot' in March 2015, New Delhi, India."
    },
    {
      id: 11,
      year: 2015,
      title: "IIT Delhi Class of 89 Innovation Award",
      organization: "IIT Delhi",
      description: "Runner-up award of IIT Delhi Class of 89 Innovation Award 2015, New Delhi, India."
    },
    {
      id: 12,
      year: 2015,
      title: "Young Professional Engineering Award",
      organization: "Maharana Pratap University of Agriculture and Technology",
      description: "Received Young Professional Engineering Award from MPUAT, Udaipur, Rajasthan, India."
    },
    {
      id: 13,
      year: 2015,
      title: "Best Presentation Award",
      organization: "National Conference on Solar Robotics",
      description: "Received the Best Presentation Award at Jamia Milia Islamia, New Delhi, India, August 2015."
    },
    {
      id: 14,
      year: 2015,
      title: "Judge Committee Member",
      organization: "ROBOTRONICS-2015, Amity International School",
      description: "Invited as a Judge in Robotics competition at Amity International School, Gurgaon, Delhi-NCR India."
    },
    {
      id: 15,
      year: 2011,
      title: "Junior Research Fellowship",
      organization: "IIT Delhi",
      description: "Recipient of a Junior Research Fellowship from the Industrial Research and Development Unit, Indian Institute of Technology Delhi, India, August 2011."
    }
  ];
  
  // Get the awards to display based on showMore state
  const displayedAwards = showMoreAwards ? allAwards : allAwards.slice(0, 5);
  
  // Missing grants array added here
  const grants = [
    {
      id: 1,
      years: "Current",
      title: "Design and Development of a Soft Exosuit for Upper Arm Rehabilitation with GUI Monitoring",
      amount: "₹45,50,000",
      agency: "Prime Minister Early Career Research Grant Award, India"
    },
    {
      id: 2,
      years: "Current",
      title: "Next-Generation Prosthetic hand",
      amount: "₹1,32,00,000",
      agency: "IHFC, IIT Delhi and DST, India"
    },
    {
      id: 3,
      years: "Current",
      title: "Next-Generation Mobility: AI-powered Brain-Muscle-Controlled Lower Limb Exoskeleton",
      amount: "₹25,00,000",
      agency: "Seed Grant, IIT Jodhpur, India"
    },
    {
      id: 4,
      years: "Current", 
      title: "Affordable and Energy-Efficient EMG-Controlled 3-Finger Prosthetic Hand for Amputees",
      amount: "₹8,50,000",
      agency: "International NGO BMVSS, India"
    },
    {
      id: 5,
      years: "Current", 
      title: "Spacecraft Docking Soft Impact Dynamics Modelling and Simulation",
      amount: "₹28,00,000",
      agency: "Indian Space Research Organisation, India"
    }
  ];
  
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
        {allAwards.length > 5 && (
          <div className="read-more-container">
            <button 
              className={`read-more-btn ${showMoreAwards ? 'active' : ''}`} 
              onClick={toggleMoreAwards}
            >
              {showMoreAwards ? 'Show Less' : `Show More Awards (${allAwards.length - 5} more)`} 
              <span className="arrow-icon">{showMoreAwards ? '↑' : '↓'}</span>
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
