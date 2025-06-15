/**
 * Utility functions for device detection and capability checking
 * Uses feature detection rather than User-Agent sniffing for better reliability
 */

/**
 * Checks if the device is likely to be a mobile device
 * Based on screen size, touch capability, and pointer accuracy
 */
export const isMobileDevice = () => {
  // Screen size check - common mobile breakpoint
  const isSmallScreen = window.innerWidth <= 768;
  
  // Touch capability check
  const hasTouchCapability = 'ontouchstart' in window || 
                             navigator.maxTouchPoints > 0 ||
                             navigator.msMaxTouchPoints > 0;
  
  // Pointer accuracy check if available
  let hasCoarsePointer = false;
  if (window.matchMedia) {
    // The pointer media query is more reliable than just touch detection
    hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  }
  
  // Combine factors - if screen is small AND device has touch OR coarse pointer, it's likely mobile
  return isSmallScreen && (hasTouchCapability || hasCoarsePointer);
};

/**
 * Checks if the device is likely to have limited performance
 * Based on processor cores, memory, connection speed, etc.
 */
export const hasLimitedPerformance = () => {
  // Check for hardware concurrency (CPU cores)
  const lowCpuCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  
  // Check device memory if available
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  
  // Check for battery status if available
  let batteryLow = false;
  if (navigator.getBattery) {
    try {
      navigator.getBattery().then(battery => {
        batteryLow = battery.level <= 0.2 && !battery.charging;
      }).catch(() => {
        // Battery API not available or permission denied
      });
    } catch (e) {
      // getBattery might throw in some browsers
    }
  }
  
  // Check connection speed if available
  let slowConnection = false;
  if (navigator.connection) {
    const connection = navigator.connection;
    slowConnection = connection.saveData || 
                    connection.effectiveType === 'slow-2g' || 
                    connection.effectiveType === '2g' || 
                    connection.effectiveType === '3g';
  }
  
  // Device is considered performance-limited if any two factors are true
  let limitedFactors = [lowCpuCores, lowMemory, batteryLow, slowConnection].filter(Boolean).length;
  
  // On mobile, we're stricter about performance limitations
  if (isMobileDevice()) {
    return limitedFactors >= 1 || true; // Force limited performance for all mobile devices
  }
  
  return limitedFactors >= 2;
};

/**
 * Checks if animations are likely to cause issues
 */
export const shouldDisableAnimations = () => {
  // Check if user has explicitly requested reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check if user has set a preference in localStorage
  const userPreference = localStorage.getItem('reduce-motion');
  const userWantsReducedMotion = userPreference === 'true';
  
  // Mobile devices with limited performance should disable animations
  const isMobile = isMobileDevice();
  const isLowPower = hasLimitedPerformance();
  
  return prefersReducedMotion || userWantsReducedMotion || (isMobile && isLowPower);
};

/**
 * Configures appropriate animation settings based on device capabilities
 */
export const getAnimationSettings = () => {
  const isMobile = isMobileDevice();
  const isLowPower = hasLimitedPerformance();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for localStorage override
  const userMotionPreference = localStorage.getItem('motion-preference');
  
  // Give user preference highest priority if set
  let disableAnimations = false;
  let useSimplifiedAnimations = false;
  
  if (userMotionPreference) {
    if (userMotionPreference === 'disabled') {
      disableAnimations = true;
    } else if (userMotionPreference === 'simplified') {
      useSimplifiedAnimations = true;
    }
  } else {
    // Otherwise use device detection
    disableAnimations = prefersReducedMotion;
    useSimplifiedAnimations = isMobile || isLowPower;
  }
  
  return {
    // Disable animations completely if requested by user
    disableAnimations,
    
    // Use simplified animations on mobile/low-power devices
    useSimplifiedAnimations,
    
    // Reduce parallax intensity on mobile
    parallaxIntensity: isMobile ? 0.2 : 1,
    
    // Reduce stagger delay on mobile
    staggerDelay: isMobile ? 0.05 : 0.1,
    
    // Shorten animation durations on mobile
    durationMultiplier: isMobile ? 0.7 : 1,
    
    // Reduce or eliminate 3D effects on mobile
    use3DEffects: !isMobile && !isLowPower,
    
    // Preference for transform over opacity for better performance
    preferTransform: isMobile || isLowPower,
    
    // Use simpler easing functions on mobile
    easingFunction: isMobile ? "power1.out" : "power3.out",
    
    // Disable scroll-linked effects on low-power devices
    disableScrollEffects: isLowPower,
    
    // Flag for motion components to use static versions instead
    useMotion: !isMobile && !prefersReducedMotion && !isLowPower,
    
    // Mobile-specific settings
    isMobile,
    isLowPower,
    prefersReducedMotion
  };
};

/**
 * Applies optimization classes to the document for CSS-based optimizations
 */
export const applyDeviceClasses = () => {
  const isMobile = isMobileDevice();
  const isLowPower = hasLimitedPerformance();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Add classes to HTML element for CSS targeting
  if (isMobile) document.documentElement.classList.add('is-mobile-device');
  if (isLowPower) document.documentElement.classList.add('is-low-power-device');
  if (prefersReducedMotion) document.documentElement.classList.add('prefers-reduced-motion');
  
  // Add class specifically for motion handling
  if (isMobile || isLowPower || prefersReducedMotion) {
    document.documentElement.classList.add('disable-motion');
  }
  
  // Listen for theme changes to maintain classes across theme toggles
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        // Re-apply classes that might be lost during theme change
        if (isMobile) document.documentElement.classList.add('is-mobile-device');
        if (isLowPower) document.documentElement.classList.add('is-low-power-device');
        if (prefersReducedMotion) document.documentElement.classList.add('prefers-reduced-motion');
        if (isMobile || isLowPower || prefersReducedMotion) {
          document.documentElement.classList.add('disable-motion');
        }
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
  
  // Return cleanup function
  return () => observer.disconnect();
};
