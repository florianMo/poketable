const positionAbsolute = (LEFT,TOP,WIDTH,HEIGHT) => {
  
  return {
    position: 'absolute',
    left:   (typeof(LEFT)==='number') ?   `${LEFT}%` : LEFT,
    top:    (typeof(TOP)==='number') ?    `${TOP}%` : TOP,
    width:  (typeof(WIDTH)==='number') ?  `${WIDTH}%` : WIDTH,
    height: (typeof(HEIGHT)==='number') ? `${HEIGHT}%` : HEIGHT,
    // outline: '1px dotted black',
  }
}
export default positionAbsolute;