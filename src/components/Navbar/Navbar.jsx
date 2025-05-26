import { useState, useEffect } from 'react';
import { ThemeToggler } from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active section based on scroll position - improved logic
      const sections = document.querySelectorAll('section[id], div[id]');
      
      // Find the section closest to the top of the viewport
      let current = '';
      let minDistance = Number.MAX_VALUE;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        const distance = Math.abs(window.scrollY - sectionTop);
        
        // Check if we're within this section or if this is the closest section
        if (
          (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) ||
          distance < minDistance
        ) {
          minDistance = distance;
          current = id;
        }
      });
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    // Run once on component mount to set initial active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Toggle mobile menu with section highlighting
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle nav item click - set active section explicitly
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#home">
            <span className="logo-text">Dr.<span className="logo-highlight">Suthar</span></span>
          </a>
        </div>
        
        <div className={`navbar-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <a 
              href="#home" 
              onClick={() => handleNavClick('home')} 
              className={activeSection === 'home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={() => handleNavClick('about')} 
              className={activeSection === 'about' ? 'active' : ''}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#research" 
              onClick={() => handleNavClick('research')} 
              className={activeSection === 'research' ? 'active' : ''}
            >
              Research
            </a>
          </li>
          <li>
            <a 
              href="#publications" 
              onClick={() => handleNavClick('publications')} 
              className={activeSection === 'publications' ? 'active' : ''}
            >
              Publications
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              onClick={() => handleNavClick('projects')} 
              className={activeSection === 'projects' ? 'active' : ''}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#awards" 
              onClick={() => handleNavClick('awards')} 
              className={activeSection === 'awards' ? 'active' : ''}
            >
              Awards
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={() => handleNavClick('contact')} 
              className={activeSection === 'contact' ? 'active' : ''}
            >
              Contact
            </a>
          </li>
          <li className="theme-toggle-li">
            <ThemeToggler />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
