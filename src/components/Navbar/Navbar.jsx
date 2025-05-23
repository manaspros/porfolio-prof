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
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
              onClick={() => setIsMobileMenuOpen(false)} 
              className={activeSection === 'home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={activeSection === 'about' ? 'active' : ''}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#research" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={activeSection === 'research' ? 'active' : ''}
            >
              Research
            </a>
          </li>
          <li>
            <a 
              href="#publications" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={activeSection === 'publications' ? 'active' : ''}
            >
              Publications
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={activeSection === 'projects' ? 'active' : ''}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#awards" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={activeSection === 'awards' ? 'active' : ''}
            >
              Awards
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)} 
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
