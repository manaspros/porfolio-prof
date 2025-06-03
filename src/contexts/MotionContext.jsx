import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context for motion capabilities
const MotionContext = createContext({
  shouldUseMotion: true,
  isMobile: false,
  isLowPower: false,
});

export const MotionProvider = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    shouldUseMotion: true,
    isMobile: false,
    isLowPower: false,
  });

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobileDevice = () => {
      const isMobile = window.innerWidth <= 768 ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;

      // Check for low power mode
      const isLowPower = navigator.hardwareConcurrency &&
        navigator.hardwareConcurrency <= 4;

      // Check if user has requested reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Use motion except on mobile, low power devices, or if user prefers reduced motion
      const shouldUseMotion = !prefersReducedMotion &&
        !(isMobile && isLowPower);

      setDeviceInfo({
        shouldUseMotion,
        isMobile,
        isLowPower,
      });

      // Apply classes to body based on motion capabilities
      const body = document.body;
      if (!shouldUseMotion) {
        body.classList.add('disable-motion');
      } else {
        body.classList.remove('disable-motion');
      }

      if (isMobile) {
        body.classList.add('is-mobile-device');
      } else {
        body.classList.remove('is-mobile-device');
      }
    };

    checkMobileDevice();

    // Recheck on window resize
    window.addEventListener('resize', checkMobileDevice);

    return () => {
      window.removeEventListener('resize', checkMobileDevice);
    };
  }, []);

  return (
    <MotionContext.Provider value={deviceInfo}>
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
