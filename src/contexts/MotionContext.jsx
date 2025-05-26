import { createContext, useContext, useEffect, useState } from 'react';
import { isMobileDevice, hasLimitedPerformance } from '../utils/deviceDetection';

// Create context for motion capabilities
const MotionContext = createContext({
  shouldUseMotion: true,
  isMobile: false,
  isLowPower: false,
  prefersReducedMotion: false
});

export const MotionProvider = ({ children }) => {
  const [motionCapabilities, setMotionCapabilities] = useState({
    shouldUseMotion: true,
    isMobile: false,
    isLowPower: false,
    prefersReducedMotion: false
  });

  useEffect(() => {
    // Detect device capabilities
    const mobile = isMobileDevice();
    const lowPower = hasLimitedPerformance();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const userDisabledMotion = localStorage.getItem('disable-motion') === 'true';
    
    // Determine if we should use motion
    const shouldUse = !mobile && !lowPower && !prefersReduced && !userDisabledMotion;
    
    setMotionCapabilities({
      shouldUseMotion: shouldUse,
      isMobile: mobile,
      isLowPower: lowPower,
      prefersReducedMotion: prefersReduced
    });
    
    // Add listener for prefers-reduced-motion changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotionChange = (e) => {
      setMotionCapabilities(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        shouldUseMotion: !e.matches && !prev.isMobile && !prev.isLowPower
      }));
    };
    
    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    } else {
      // Fallback for older browsers
      reducedMotionQuery.addListener(handleReducedMotionChange);
    }
    
    return () => {
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      } else {
        reducedMotionQuery.removeListener(handleReducedMotionChange);
      }
    };
  }, []);

  return (
    <MotionContext.Provider value={motionCapabilities}>
      {children}
    </MotionContext.Provider>
  );
};

// Hook to use motion context
export const useMotion = () => useContext(MotionContext);

// Utility function for component props
export const getMotionProps = (motionProps = {}, staticProps = {}) => {
  const { shouldUseMotion } = useMotion();
  return shouldUseMotion ? motionProps : staticProps;
};
