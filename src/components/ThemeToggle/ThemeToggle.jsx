import { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    setIsDarkMode(!isDarkMode);
    
    if (!isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" fill="currentColor"/>
          <path d="M10 3.5V1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M10 18.5V16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16.5 10H18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1.5 10H3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14.5 5.5L16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 16L5.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14.5 14.5L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 4L5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.7927 3.28596C7.46607 3.63682 4.82422 6.41582 4.82422 9.82425C4.82422 13.4184 7.73984 16.334 11.334 16.334C14.7424 16.334 17.5214 13.6922 17.8723 10.3655C17.9235 9.96828 17.4978 9.71954 17.1348 9.87137C16.4525 10.1521 15.7117 10.3057 14.9369 10.3057C12.0088 10.3057 9.64454 7.94148 9.64454 5.01341C9.64454 4.23863 9.79814 3.49778 10.0789 2.81551C10.2307 2.45248 9.98197 2.02675 9.58475 2.07799C9.98823 2.03321 10.3996 3.22125 10.7927 3.28596Z" fill="currentColor"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
