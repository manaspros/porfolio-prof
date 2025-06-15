import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Navbar.css';
import { ThemeToggler } from '../ThemeToggle/ThemeToggle';
import { useMotion } from '../../contexts/MotionContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const { shouldUseMotion } = useMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Only apply motion-related fixes if motion is enabled
      if (shouldUseMotion) {
        // Skip force-visible fixes for hero section to allow natural animations
        if (targetId !== 'hero' && targetId !== 'home') {
          // Force content visibility immediately for non-hero sections
          const section = targetElement;
          section.classList.add('navigation-triggered', 'force-visible');

          // Make all content in section visible
          const allElements = section.querySelectorAll('*');
          allElements.forEach(el => {
            el.classList.add('section-content-visible');
          });
        }

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // After scroll completes, refresh ScrollTrigger and clean up classes
        setTimeout(() => {
          if (ScrollTrigger) {
            ScrollTrigger.refresh();

            // Trigger any pending animations for non-hero sections
            if (targetId !== 'hero' && targetId !== 'home') {
              ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === targetElement || targetElement.contains(trigger.vars.trigger)) {
                  trigger.refresh();
                }
              });
            }
          }

          // Clean up temporary classes after a delay (only for non-hero sections)
          if (targetId !== 'hero' && targetId !== 'home') {
            setTimeout(() => {
              targetElement.classList.remove('navigation-triggered');
              const allElements = targetElement.querySelectorAll('*');
              allElements.forEach(el => {
                el.classList.remove('section-content-visible');
              });
            }, 1000);
          }
        }, 500);
      } else {
        // Simple scroll for devices with motion disabled
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const navItems = [
    { label: 'Home', href: 'hero' },
    { label: 'About', href: 'about' },
    { label: 'Research', href: 'research' },
    { label: 'Publications', href: 'publications' },
    { label: 'Projects', href: 'projects' },
    { label: 'Awards', href: 'awards' },
    { label: 'Contact', href: 'contact' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>
            <span className="logo-text">Dr.<span className="logo-highlight"> Bhivraj Suthar</span></span>
          </a>
        </div>

        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="theme-toggle-li">
            <ThemeToggler />
          </li>
        </ul>

        <div
          className={`navbar-menu-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
