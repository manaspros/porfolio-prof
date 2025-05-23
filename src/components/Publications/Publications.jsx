import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ResearchHighlight } from '../ui/ResearchHighlight';
import './Publications.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Publications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(5);
  const [hoveredItem, setHoveredItem] = useState(null);
  const sectionRef = useRef(null);
  const pubListRef = useRef(null);
  
  const publications = [
    {
      id: 1,
      title: "Design of Adaptive Sensor Coupling-based Upper Limb 7-DOF Exoskeleton for Smooth Human Motion Tracking: ASC-EXO",
      authors: "Suthar, B., Mohd.Zubair, Kansal, S. and Mukherjee, S.",
      journal: "IEEE Sensors Journal",
      year: 2023,
      type: "journal",
      url: "#",
      citation: 5
    },
    {
      id: 2,
      title: "Design and Feasibility Analysis of a Foldable Robot Arm for Drones Using a Twisted String Actuator: FRAD",
      authors: "Suthar, B. and Jung, S.",
      journal: "IEEE Robotics and Automation Letters",
      year: 2021,
      type: "journal",
      url: "#",
      citation: 12
    },
    {
      id: 3,
      title: "Design and Bending Analysis of a Metamorphic Parallel Twisted-Scissor Mechanism",
      authors: "Suthar, B. and Jung, S.",
      journal: "Transactions of ASME-Journal of Mechanisms and Robotics",
      year: 2021,
      type: "journal",
      url: "#",
      citation: 8
    },
    {
      id: 4,
      title: "Single Motor-based Bidirectional Twisted String Actuation with Variable Radius Pulleys",
      authors: "Khan, M.A., Suthar, B., Gaponov, I. and Ryu, J.H.",
      journal: "IEEE Robotics and Automation Letters",
      year: 2019,
      type: "journal",
      url: "#",
      citation: 22
    },
    {
      id: 5,
      title: "Development of a Compliant Joint Based Upper Limb Exoskeleton for Stable Tele-manipulation: CJ EXO",
      authors: "Suthar, B., Zubair, M., Kansal, S. and Mukherjee, S.",
      journal: "IEEE RAS/EMBS International Conference on Biomedical Robotics and Biomechatronics",
      year: 2022,
      type: "conference",
      url: "#",
      citation: 7
    },
    {
      id: 6,
      title: "Conceptual Design of an Extendable Rope-inspired Module Space Orbit Arm for Maneuvering: ERM- SOA",
      authors: "Suthar, B. and Jung, S.",
      journal: "46th NASA Aerospace Mechanisms Symposium",
      year: 2022,
      type: "conference",
      url: "#",
      citation: 4
    },
    {
      id: 7,
      title: "Design and Experimental Evaluation of Foldable Robot Arms for holding and Installation Work: FRAHI",
      authors: "Suthar, B., Chio, Y.J., and Jung, S.",
      journal: "IEEE International Conference on Robot and Human Interactive Communication",
      year: 2021,
      type: "conference",
      url: "#",
      citation: 9
    },
    {
      id: 8,
      title: "Soft Twisted String Actuator Module for Wearable Robotic Applications",
      authors: "Suthar, B., Gaponov, I., and Ryu, J.H.",
      journal: "International workshop on Active Materials and Soft Mechatronics",
      year: 2018,
      type: "conference",
      url: "#",
      citation: 11
    }
  ];
  
  useEffect(() => {
    // ScrollTrigger is already registered globally, no need to register again here
    
    // Animate section title with a reveal effect
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
    
    // Create a staggered reveal effect for filter buttons
    gsap.fromTo(
      '.filter-btn',
      { 
        scale: 0.8, 
        opacity: 0,
        y: 20
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: '.filter-controls',
          start: 'top 85%'
        }
      }
    );
    
    // Setup a scroll animation context for publication items
    const updatePublicationItems = () => {
      if (pubListRef.current) {
        // Clean previous animations
        const items = pubListRef.current.querySelectorAll('.publication-item');
        
        gsap.fromTo(
          items,
          { 
            y: 50, 
            opacity: 0,
            x: -20,
            rotateX: "10deg"
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            rotateX: "0deg",
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pubListRef.current,
              start: 'top 85%',
              once: false,
              invalidateOnRefresh: true
            }
          }
        );
      }
    };
    
    // Run animation when filter or visible count changes
    updatePublicationItems();
    
    // Animated 3D metrics counter
    gsap.fromTo(
      '.publications-metrics .metric-number',
      { 
        textContent: 0,
        opacity: 0,
        rotateY: 90
      },
      {
        textContent: (i, target) => target.getAttribute('data-value'),
        opacity: 1,
        rotateY: 0,
        duration: 2,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.publications-metrics',
          start: 'top 80%'
        },
        snap: { textContent: 1 }
      }
    );
    
    return () => {
      // Clean up animations - this was causing the error
      if (ScrollTrigger) {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => trigger.kill());
      }
    };
  }, [activeFilter, visibleCount]);
  
  // Handle hover effects
  const handleMouseEnter = (id) => {
    setHoveredItem(id);
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  
  // Filter publications based on active filter
  const filteredPublications = activeFilter === 'all' 
    ? publications 
    : publications.filter(pub => pub.type === activeFilter);
    
  const displayedPublications = filteredPublications.slice(0, visibleCount);
  
  // Handle load more
  const handleLoadMore = () => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: "+=" + window.innerHeight * 0.3, autoKill: true },
      ease: "power2.inOut"
    });
    setVisibleCount(prev => prev + 3);
  };
  
  return (
    <section id="publications" className="publications-section" ref={sectionRef}>
      <div className="publications-bg"></div>
      <div className="section-container">
        <h2 className="section-title">
          <ResearchHighlight>Research</ResearchHighlight> Publications
        </h2>
        
        <div className="filter-controls">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span className="filter-icon">📚</span>
            <span>All Publications</span>
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'journal' ? 'active' : ''}`}
            onClick={() => setActiveFilter('journal')}
          >
            <span className="filter-icon">📰</span>
            <span>Journal Articles</span>
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'conference' ? 'active' : ''}`}
            onClick={() => setActiveFilter('conference')}
          >
            <span className="filter-icon">🎤</span>
            <span>Conference Papers</span>
          </button>
        </div>
        
        <div className="publications-list" ref={pubListRef}>
          {displayedPublications.map(pub => (
            <div 
              className={`publication-item ${hoveredItem === pub.id ? 'hovered' : ''}`} 
              key={pub.id}
              onMouseEnter={() => handleMouseEnter(pub.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="pub-decoration"></div>
              <div className="pub-citation">
                <div className="citation-ring">
                  <span className="citation-count">{pub.citation}</span>
                </div>
                <span className="citation-label">Citations</span>
              </div>
              <div className="pub-content">
                <div className="pub-year-badge">{pub.year}</div>
                <h3 className="pub-title">{pub.title}</h3>
                <p className="pub-authors">{pub.authors}</p>
                <div className="pub-journal">
                  <span className="journal-name">{pub.journal}</span>
                  <span className="pub-type-badge">{pub.type === 'journal' ? 'Journal Article' : 'Conference Paper'}</span>
                </div>
                <div className="pub-links">
                  <a href={pub.url} className="pub-link primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    View Publication
                  </a>
                  <a href="#" className="pub-link secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 7H7V9H9V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 15H7V17H9V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 7H11V9H17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 15H11V17H17V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Cite
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {visibleCount < filteredPublications.length && (
          <div className="load-more">
            <button className="load-more-btn" onClick={handleLoadMore}>
              <span>Load More Publications</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 14L12 21L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 21V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
        
        <div className="publications-metrics">
          <div className="metrics-card">
            <div className="metric-item">
              <span className="metric-number" data-value="100+">0</span>
              <svg className="citations-icon" viewBox="0 0 24 24" width="40" height="40">
                <path d="M7,6 C7,4.34314575 8.34314575,3 10,3 L17,3 C18.6568542,3 20,4.34314575 20,6 L20,18 C20,19.6568542 18.6568542,21 17,21 L10,21 C8.34314575,21 7,19.6568542 7,18 L7,6 Z" fill="#0066cc" opacity="0.2"></path>
                <path d="M4,4 L4,16 C4,17.1045695 4.8954305,18 6,18 L17,18" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M12,10 L15,10" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M12,15 L15,15" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M9,10 L9,10" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M9,15 L9,15" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></path>
              </svg>
              <span className="metric-label">Total Citations</span>
            </div>
            <div className="metric-item">
              <span className="metric-number" data-value="9">0</span>
              <svg className="journal-icon" viewBox="0 0 24 24" width="40" height="40">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="#0066cc" opacity="0.2"></rect>
                <line x1="3" y1="9" x2="21" y2="9" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></line>
                <line x1="9" y1="21" x2="9" y2="9" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></line>
                <rect x="12" y="12" width="6" height="3" rx="1" fill="#0066cc"></rect>
                <rect x="12" y="17" width="6" height="3" rx="1" fill="#0066cc"></rect>
              </svg>
              <span className="metric-label">Journal Articles</span>
            </div>
            <div className="metric-item">
              <span className="metric-number" data-value="15+">0</span>
              <svg className="conference-icon" viewBox="0 0 24 24" width="40" height="40">
                <circle cx="12" cy="12" r="9" fill="#0066cc" opacity="0.2"></circle>
                <path d="M12,8 L12,16" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M9,10 L15,10" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M7,14 L17,14" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"></path>
              </svg>
              <span className="metric-label">Conference Papers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
