import { motion } from 'framer-motion'

const FadeIn = ({children, delay = 0.05 }) => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          delay,
          duration: 0.5,
          ease: "easeOut"
        }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    )
}

export default FadeIn;