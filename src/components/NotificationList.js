import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"

// Export component
const Notification = ({type, children}) => {
  // Handle hiding this notification
  const [isVisible, setIsVisible] = useState(true);

  const hideSelf = () => {
    setIsVisible(false)
  };
  
  // Automatically hide the notification
  useEffect(() => {
    setTimeout(() => {
        hideSelf();
    }, 1500);
  }, []);
  
  
  // Return JSX
  return (
      
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='notification'
          initial={{ opacity: 0, rotate: -10, scale: .5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 0, scale: .5 }}
          style={{
            backgroundColor: (type==='success') ? 'lime': 'orange',
            position: 'absolute',
            top: 0
          }}
        >
          <div>
            <strong>{(type==='success') ? 'Bravo!': 'Raté'}</strong>
            <small>{children} </small>
          </div>  
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NotificationList = ({list, style}) => {
  // Handle hiding this notification
  const [, setIsVisible] = useState(true);

  const hideSelf = () => {
    setIsVisible(false)
  };
  
  // Automatically hide the notification
  useEffect(() => {
    setTimeout(() => {
        hideSelf();
    }, 1500);
  }, []);
  
  
  // Return JSX
  return (
    <div style={{...style}} list={list}>
      {list.map((type, i)=>
        <Notification key={i} type={type}></Notification>
      )}
    </div>
)};
export default NotificationList;