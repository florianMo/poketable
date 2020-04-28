import React from 'react';

const Backgroundgradiant = ({color1,color2, style}) =>{
  return (
    <div style={{
      position: 'fixed',
      backgroundColor: color1,
      backgroundImage: `linear-gradient(-15deg, ${color1} 0%, ${color2} 100%)`,
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      ...style
    }}/>
)}
export default Backgroundgradiant