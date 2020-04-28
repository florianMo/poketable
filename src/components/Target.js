import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const Target = ({pokelist, round, isStarted, style, pokeIndex}) => {
  return (
    <div className="target" style={{
      ...style,
      backgroundColor: '#00E7FB',
      overflow: 'hidden',
      borderRadius: '.2rem',
      border: '.15rem solid navy',
      boxShadow: '0 0 0 .5rem #FFF, 0 .2rem 0 .5rem rgba(109, 3, 64, 0.5)',
    }}>
      {isStarted &&
        <AnimatePresence>
          <motion.img
            key={pokelist[round+pokeIndex].number}
            src={`/poketable/img/hd/${pokelist[round+pokeIndex].number}.png`}
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%', rotate: 360, scale: 0}}
            width={'100%'}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            transition={{
              duration: 0.5
            }}
          />
        </AnimatePresence>
      }
      {isStarted &&
        <AnimatePresence>
          <motion.div
            key={pokelist[round+pokeIndex].name}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '50%', scale: 0}}
            style={{
              position: 'absolute',
              bottom: '.5rem',
              right: '.5rem',
              fontSize: '.75rem',
              color: 'navy',
              textTransform: 'uppercase'
            }}
            transition={{
              duration: 0.5
            }}
          >{pokelist[round+pokeIndex].name}</motion.div>
        </AnimatePresence>
      }
      {isStarted &&
        <AnimatePresence>
          <motion.div
            key={pokelist[round+pokeIndex].name}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '50%', scale: 0}}
            style={{
              position: 'absolute',
              bottom: '.5rem',
              left: '.5rem',
              fontSize: '.75rem',
              color: 'navy',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
            transition={{
              duration: 0.5
            }}
          >{round}</motion.div>
        </AnimatePresence>
      }
    </div>
  )
}

export default Target
