import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface AnimatedPhotoProps extends React.HTMLAttributes<HTMLImageElement> {
  photoUrl: string;
  alt?: string;
  className?: string;
  direction?: number;
  uniqueKey: string;
  duration?: number;
  children?: React.ReactNode;
}

export const ScrollAnimation = ({
  photoUrl,
  alt = "Фото",
  className = "photo-img",
  direction = 1,
  uniqueKey,
  duration = 0.3,
  children
}: AnimatedPhotoProps) => {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      {photoUrl && (
        <motion.img
          key={uniqueKey}
          className={className}
          src={photoUrl}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          style={{ position: 'relative' }}
        >
          {children}
        </motion.img>
      )}
    </AnimatePresence>
  );
};