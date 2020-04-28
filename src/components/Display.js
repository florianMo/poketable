import React from 'react'

const Display = ({round, lives, riddle, multi, style, isLost}) => {
  return (
    <div className="display" style={{
      ...style, 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      backgroundImage: 'linear-gradient(180deg, #14014a 0%, #0f003b 100%)',
      color: 'white', padding: '1rem',
      boxShadow: 'inset 0 .33rem 0 0 rgba(0,0,0,.33)',
      borderRadius: '.5rem',
      fontWeight: 500
    }}>
      <div style={{fontSize: '1.5rem'}}>
        <strong>{riddle.a} {multi? 'x':'+'} {riddle.b}</strong>
        {!isLost &&
          <span style={{opacity: .67}}> = ? </span>
        }
        {isLost &&
          <strong style={{color: 'yellow'}}> = {riddle.s}</strong>
        }
      </div>
      <div>PV: 
        {lives>1 &&
          <strong style={{color: 'lime'}}> {lives}</strong>
        }
        {lives===1 &&
          <strong style={{color: 'orange'}}> 1</strong>
        }
        {lives===0 &&
          <strong style={{color: 'orangered'}}> 0</strong>
        }
      </div>
    </div>
  )
}

export default Display
