import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageAnimationProps {
  children: ReactNode;
  className?: string;
}

export const PageAnimation = ({ children, className }: PageAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={className}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
};