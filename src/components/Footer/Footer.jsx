import { useEffect } from 'react';
import { gsap } from 'gsap';
import './Footer.css';

const Footer = () => {
  useEffect(() => {
    gsap.fromTo(
      '.footer-container',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 90%'
        }
      }
    );
  }, []);
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <h2>Dr. Bhivraj Suthar</h2>
            <p>Assistant Professor, Roboticist at School of Artificial Intelligence and Data Science, IIT Jodhpur</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Navigation</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#research">Research</a></li>
                <li><a href="#publications">Publications</a></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#projects">Developed Robots</a></li>
                <li><a href="#awards">Awards</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#">Resume</a></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>Connect</h3>
              <ul>
                <li><a href="https://www.linkedin.com/in/bhivraj-suthar-ph-d-0729aa33/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://scholar.google.com/citations?user=3KZSSEIAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
                <li><a href="https://www.researchgate.net/profile/Bhivraj_Suthar2" target="_blank" rel="noopener noreferrer">ResearchGate</a></li>
                <li><a href="https://www.youtube.com/channel/UClkWY-vpshRUFWZut_gqZhQ/videos" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Dr. Bhivraj Suthar. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
