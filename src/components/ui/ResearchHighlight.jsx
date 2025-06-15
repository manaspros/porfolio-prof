import React, { useEffect, useRef } from 'react';
import './ResearchHighlight.css';

export const ResearchHighlight = ({ children }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;
    
    const container = containerRef.current;
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      const { left, top } = container.getBoundingClientRect();
      mouseX = e.clientX - left;
      mouseY = e.clientY - top;
      
      // Apply the highlight effect
      container.style.setProperty('--mouse-x', `${mouseX}px`);
      container.style.setProperty('--mouse-y', `${mouseY}px`);
    };
    
    // Set up an animation to reveal the highlight background
    const textElement = textRef.current;
    textElement.style.backgroundSize = '0% 100%';
    
    setTimeout(() => {
      textElement.style.transition = 'background-size 1.5s ease';
      textElement.style.backgroundSize = '100% 100%';
    }, 100);
    
    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="research-highlight-container">
      <span ref={textRef} className="research-highlight-text">
        {children}
      </span>
    </div>
  );
};
