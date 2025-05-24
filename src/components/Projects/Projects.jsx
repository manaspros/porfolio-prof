import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);
  const timelineRef = useRef(null);
  
  // Projects data
  const projects = [
    {
      id: 1,
      title: "Supplementary Robotic Limb (SRL)",
      description: "A wearable robotic arm that provides supplementary capabilities for assistance in various tasks, designed to be lightweight and adaptable.",
      image: "https://static.wixstatic.com/media/fbe72c_e7f842092d234ac285b9bd150e16916d~mv2.jpg/v1/crop/x_0,y_0,w_311,h_516/fill/w_359,h_619,al_c,lg_1,q_80,enc_avif,quality_auto/TSA_SRL1.jpg",
      category: "wearable",
      url: "#",
      technologies: ["Twisted String Actuators", "Robotics", "Wearable Technology"]
    },
    {
      id: 2,
      title: "Sixth Robotic Finger (SRF)",
      description: "A robotic sixth finger design that provides supplementary grasping capabilities to assist individuals with hand impairments or for enhanced manipulation.",
      image: "https://static.wixstatic.com/media/fbe72c_ee7122692ad4403c9d25190d5644d1e0~mv2.png/v1/crop/x_8,y_0,w_502,h_242/fill/w_440,h_190,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/SRF.png",
      category: "assistance",
      url: "#",
      technologies: ["Soft Robotics", "Assistive Technology", "Hand Augmentation"]
    },
    {
      id: 3,
      title: "Adaptive Sensor Coupling Exoskeleton (ASC-EXO)",
      description: "A 7-DOF upper limb exoskeleton with adaptive sensor coupling that enables smooth human motion tracking for rehabilitation and assistance.",
      image: "https://via.placeholder.com/600x400?text=ASC-EXO",
      category: "exoskeleton",
      url: "#",
      technologies: ["Adaptive Sensors", "Exoskeleton", "Rehabilitation"]
    },
    {
      id: 4,
      title: "Foldable Robot Arms (FRAC)",
      description: "Designed for collaborative environments, these foldable robot arms offer versatile assistance while maintaining a compact form factor when not in use.",
      image: "https://i.ytimg.com/vi/DYgFDl-JJ0s/sddefault.jpg",
      category: "foldable",
      url: "#",
      technologies: ["Collaborative Robotics", "Foldable Mechanisms", "Human-Robot Interaction"]
    },
    {
      id: 5,
      title: "Foldable Drone Arm (FRAD)",
      description: "A specialized robotic arm designed for drones that can fold compactly when not in use and extend for manipulation tasks during flight.",
      image: "https://static.wixstatic.com/media/fbe72c_d1ced464502c44d4a051e88e0fc61327~mv2.png/v1/crop/x_0,y_3,w_537,h_653/fill/w_276,h_344,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Raj_FRAC.png",
      category: "foldable",
      url: "#",
      technologies: ["Aerial Robotics", "Twisted String Actuator", "Metamorphic Mechanisms"]
    },
    {
      id: 6,
      title: "Brain-Computer Interface for Wearable Robotics",
      description: "A system that uses brain signals to control wearable robotic devices, providing intuitive control for users with limited mobility.",
      image: "https://via.placeholder.com/600x400?text=BCI-Robotics",
      category: "wearable",
      url: "#",
      technologies: ["Brain-Computer Interface", "AI", "Assistive Technology"]
    }
  ];
  
  // Create animated background particles
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Clear any existing particles
    const existingParticles = document.querySelectorAll('.purple-particle');
    existingParticles.forEach(p => p.remove());
    
    // Create background particles
    const createParticles = () => {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('purple-particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
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
      for (let i = 1; i <= 3; i++) {
        const glow = document.createElement('div');
        glow.classList.add('glow-effect', `glow-${i}`);
        sectionRef.current.appendChild(glow);
      }
    };
    
    createParticles();
    createGlowEffects();
    
    // Refresh animations when switching categories
    return () => {
      const particles = document.querySelectorAll('.purple-particle');
      particles.forEach(p => {
        gsap.killTweensOf(p);
      });
    };
  }, []);
  
  // Setup animations
  useEffect(() => {
    if (!projectsRef.current) return;
    
    // Kill previous animations if they exist
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    // Create title and filter animations
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
    
    mainTl.fromTo(
      '.section-title',
      { 
        y: 100, 
        opacity: 0,
        skewY: 5
      },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1,
        ease: "power3.out"
      }
    ).fromTo(
      '.section-subtitle',
      { 
        y: 50, 
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.6"
    ).fromTo(
      '.category-btn',
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );
    
    // Create staggered card animations
    const projectCards = document.querySelectorAll('.project-card');
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
    
    cardTl.fromTo(
      projectCards,
      {
        y: 100,
        opacity: 0,
        rotationX: 15,
        rotationY: -10,
        stagger: 0.15
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }
    );
    
    // Create CTA animation
    gsap.fromTo(
      '.projects-cta',
      {
        y: 80,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.projects-cta',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Create cards hover effects
    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: "power2.out",
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
    
    timelineRef.current = mainTl;
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedCategory]);
  
  // Filter projects by category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // Animate items out and in when changing categories
    const projectCards = document.querySelectorAll('.project-card');
    
    gsap.to(projectCards, {
      opacity: 0,
      y: 50,
      stagger: 0.05,
      duration: 0.3,
      onComplete: () => {
        // After animations complete, set the new category
        setSelectedCategory(category);
        
        // Re-animate the new filtered items
        setTimeout(() => {
          const newCards = document.querySelectorAll('.project-card');
          gsap.fromTo(
            newCards,
            { 
              opacity: 0, 
              y: 50, 
              rotationX: 15
            },
            { 
              opacity: 1, 
              y: 0, 
              rotationX: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: "back.out(1.7)"
            }
          );
        }, 50);
      }
    });
  };
  
  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Innovative Robotics</h2>
        <p className="section-subtitle2">
          Explore our portfolio of cutting-edge robotic systems designed to revolutionize 
          human-machine interactions and solve real-world challenges
        </p>
        
        <div className="project-categories">
          <button 
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Robots
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'wearable' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('wearable')}
          >
            Wearable
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'foldable' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('foldable')}
          >
            Foldable
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'exoskeleton' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('exoskeleton')}
          >
            Exoskeletons
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'assistance' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('assistance')}
          >
            Assistance
          </button>
        </div>
        
        <div className="projects-grid" ref={projectsRef}>
          {filteredProjects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a href={project.url} className="project-link">View Project Details →</a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="projects-cta">
          <p>Interested in our robotic innovations? Check out my videos or contact me for collaboration opportunities.</p>
          <div className="cta-buttons">
            <a href="https://www.youtube.com/channel/UClkWY-vpshRUFWZut_gqZhQ/videos" target="_blank" rel="noopener noreferrer" className="btn primary">YouTube Videos</a>
            <a href="#contact" className="btn secondary">Contact for Collaboration</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
