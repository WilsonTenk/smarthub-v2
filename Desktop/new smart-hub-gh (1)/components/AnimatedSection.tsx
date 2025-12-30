import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: string;
  style?: React.CSSProperties;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'right',
  width,
  style
}) => {
  
  const getInitialPosition = () => {
    switch(direction) {
      // "right" means it comes FROM the right (swipes left)
      case 'right': return { x: 100, opacity: 0 }; 
      case 'left': return { x: -100, opacity: 0 };
      case 'up': return { y: 60, opacity: 0 };
      case 'down': return { y: -60, opacity: 0 };
      default: return { x: 100, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch(direction) {
      case 'right': return { x: 0, opacity: 1 };
      case 'left': return { x: 0, opacity: 1 };
      case 'up': return { y: 0, opacity: 1 };
      case 'down': return { y: 0, opacity: 1 };
      default: return { x: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }} // Custom ease for smooth swipe
      className={className}
      style={{ ...(width ? { width } : {}), ...style }}
    >
      {children}
    </motion.div>
  );
};