import React from 'react'

// config: {
//   multi: true,
//   multiMax: 5,
//   addiMax: 10,
// }

const ConfigAdvanced = ({config, update}) => {

  const handleRange = (e) => {
    update({ [e.target.name]: e.target.value});
  }

  return (
    <div>
      MultiMax : 
      <input 
        type="range"
        min={2}
        max={10}
        step={1}
        value={config.multiMax}
        name="multiMax"
        onChange={(e)=>handleRange(e)}
      /> x {config.multiMax}
      <hr/>
      AddiMax : 
      <input 
        type="range"
        min={10}
        max={100}
        step={10}
        value={config.addiMax}
        name="addiMax"
        onChange={(e)=>handleRange(e)}
      /> = {config.addiMax}
      <hr/>
    </div>
  )
}

export default ConfigAdvanced;
