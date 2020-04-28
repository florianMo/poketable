import React, { useState, useEffect } from "react";

const localStyle = {
  back: {
    border: '.25rem solid #FFF',
    borderRadius: "50%",
    backgroundColor: "#93ffff",
    overflow: "hidden",
    alignTtems: 'center',
    color: 'rgba(21, 0, 234, 0.6)',
    boxShadow: 'inset 0 0 1rem 0 rgba(21, 0, 234, 0.6)',
    borderRadius: '50%',
  },
  pusher: {
    left: 0,
    top: 0,
    width: "100%",
    paddingBottom: "100%",
    // backgroundColor:'cyan',
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
  },
  line: {
    // backgroundColor: '#DDD',
    position:'absolute',
    top: '6%',
    left: '50%',
    bottom: '50%',
    width: '.2rem',
    marginLeft: '-.1rem',
    borderTop: '.4rem solid yellow',
    transformOrigin: 'center bottom',
  },
  counter: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    fontSize: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: 'rgba(16,16,199,1)',
  }
}


const Timer = ({ time, timerFeedback, timerActive, style, playSound }) => {
  const [seconds, setSeconds] = useState(time);
  const [countStart, setCountStart] = useState(true);//Pour n'écouter le décompte qu'une fois'
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

  let timeArray = []
  for (let i = 0; i < time; i++) {
    timeArray.push( i < seconds );
  }

  useEffect(() => {
    let interval = null;
    if (timerActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    if (countStart && timerActive && seconds === 3) {
      playSound('count');
      setCountStart(false);
    }
    timerFeedback(seconds);
    return () => clearInterval(interval);
  }, [timerActive, seconds, timerFeedback]);

  return (
    <div
      className="app"
      style={{ ...style, ...localStyle.back, }}
    >
      <div style={localStyle.pusher}>
        {timeArray.map((a,i)=>
          <div 
            key={i}
            style={{ 
              ...localStyle.line, 
              transform: `rotate(${360/time*i}deg)`,
              borderColor: a? 'rgba(16,16,199,.9)': 'rgba(30,144,255,.5)',
            }}
          />
        )}
      </div>
      <div style={localStyle.counter}>
        {seconds}
      </div>

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
