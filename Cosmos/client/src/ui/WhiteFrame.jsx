import FadeIn from "./FaidIn";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const WhiteFrame = () => {
    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState(false);

    const handleDoneClick = () => {
        setIsExiting(true);
        

        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    return (
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              delay: 1.6,
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            <div className="centered w-screen h-screen absolute inset-0 z-20 pointer-events-none">
              <img 
                src="/white-frame.png" 
                className="w-full h-full max-w-[95%] max-h-[95%] object-contain"
              />
              <FadeIn delay={1.8}>
                <button 
                  onClick={handleDoneClick}
                  className="absolute p-0 border-none bg-transparent cursor-pointer button-hover pointer-events-auto top-[77.5%] left-[24%]">
                  <img 
                    src="/btn-done.png" 
                    className="w-auto h-auto max-w-full max-h-full"
                  />
                </button>
              </FadeIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  export default WhiteFrame;