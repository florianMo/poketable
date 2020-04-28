import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import css from '../css';

const AnimatedScreen = ({moment, forMoment, style, children}) => {
  return (
    <AnimatePresence >
      {moment === forMoment&&
        <motion.div 
          className={`screen-${moment}`}
          style={{ ...css.screen, ...style }}
          initial={{opacity:0,}}
          animate={{opacity:1,}}
          exit={{opacity:0,}}
        > 
          {children}
        </motion.div>
      }
    </AnimatePresence>
)
}

export default AnimatedScreen
