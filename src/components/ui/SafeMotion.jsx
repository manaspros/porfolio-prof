import { motion } from 'framer-motion';
import { useMotion } from '../../contexts/MotionContext';

/**
 * SafeMotion is a wrapper component that conditionally renders
 * framer-motion components based on device capabilities.
 * It renders a static version on mobile/low-power devices.
 */
export const SafeMotion = ({ children, className = '', staticClassName = '', ...props }) => {
  const { shouldUseMotion } = useMotion();
  
  // If we should use motion, render the motion component
  if (shouldUseMotion) {
    return (
      <motion.div 
        className={className} 
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  // Otherwise, render a static version
  return (
    <div className={`${className} ${staticClassName} no-motion`}>
      {children}
    </div>
  );
};

// Variants for different element types
export const SafeMotionDiv = props => <SafeMotion {...props} />;
export const SafeMotionSection = props => <SafeMotion as="section" {...props} />;
export const SafeMotionButton = props => <SafeMotion as="button" {...props} />;

/**
 * Creates safe animation variants that won't crash on mobile
 * by providing fallback non-animated states
 */
export const createSafeVariants = (variants) => {
  // Add a safe "disabled" state that just shows the element
  const safeVariants = {
    ...variants,
    disabled: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0
    }
  };
  
  return safeVariants;
};
