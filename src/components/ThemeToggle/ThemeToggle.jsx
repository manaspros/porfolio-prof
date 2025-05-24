import { useState, useEffect } from 'react';
import './ThemeToggle.css';

export const ThemeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user previously set a preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    // Prevent multiple clicks during animation
    if (isAnimating) return;
    
    // Set animating state
    setIsAnimating(true);
    
    // Toggle dark mode state
    setIsDarkMode(!isDarkMode);
    
    // Apply theme change
    if (!isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="theme-toggle-wrapper">
      <button 
        className={`theme-toggle-button ${isDarkMode ? 'dark' : 'light'} ${isAnimating ? 'animating' : ''}`}
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <div className="toggle-track">
          <div className="toggle-indicator">
            <div className="indicator-inner">
              {isDarkMode ? (
                <svg className="moon-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-3-8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"/>
                </svg>
              ) : (
                <svg className="sun-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
                </svg>
              )}
            </div>
          </div>
          
          {/* Stars and clouds decorative elements */}
          <div className="toggle-decoration">
            <div className="stars">
              <div className="star star-1"></div>
              <div className="star star-2"></div>
              <div className="star star-3"></div>
            </div>
            <div className="clouds">
              <div className="cloud cloud-1"></div>
              <div className="cloud cloud-2"></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggler;
