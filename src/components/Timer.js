import React, { useState, useEffect } from 'react';

const Timer = ({time, timerFeedback, timerActive, style}) => {
  const [seconds, setSeconds] = useState(time);
  // const [isActive, setIsActive] = useState(false);

  // function toggle() {
  //   setIsActive(!isActive);
  // }

  // function reset() {
  //   setSeconds(time);
  //   setIsActive(false);
  // }
  // function urgent() {
  //   setSeconds(3);
  //   setIsActive(true);
  // }

  useEffect(() => {
    let interval = null;
    if (timerActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }
    timerFeedback(seconds);
    return () => clearInterval(interval);
  }, [timerActive, seconds, timerFeedback]);

  return (
    <div className="app" style={{...style, border: '.25rem solid #FFF', borderRadius: 10000, backgroundColor: '#FFF'}}>
      <div style={{
          left:0,top:0,width:'100%',
          backgroundColor:'cyan',
          borderRadius: 10000,
          overflow: 'hidden',
          paddingBottom: '100%',
          position: 'relative',
        }}
      >
        <div 
          style={{
            position: 'absolute', 
            left:0,top:0,height:'100%',
            backgroundColor: 'navy',
            width: `${seconds/time*100}%`,
          }}
        />
      </div>
      <div style={{
        position: 'absolute', 
        left:0,top:0,width: '100%',height:'100%',
        fontSize: '2rem',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        color: '#FFF',
      }}>{seconds}</div>

      {/* <div className="row" style={{position:'absolute', top: '100%'}}>
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'P' : 'S'}
        </button>
        <button className="button" onClick={reset}>
          R
        </button>
        <button className="button" onClick={urgent}>
          3
        </button>
      </div> */}
    </div>
  );
};

export default Timer;