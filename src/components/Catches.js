import React from 'react'

const Catches = ({list, style}) => {
  return (
    <div className="catches" 
      style={{
        ...style, 
        display: 'flex', 
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        justifyContent: 'flex-start',
      }}>
      <h3 style={{width: '100%'}}>Tu as attrapé <span style={{color: 'navy'}}>{list.length}</span> pokémons</h3>
      {list.map((c,i)=> 
        <article key={c.number} style={{width: '8rem', position: 'relative', textAlign: 'center'}}>
          <img src={`/img/hd/${c.number}.png`} alt={c.name}/>
          <h5 style={{
            fontWeight: 'bold',
            display: 'inline-flex',
            padding: '0.2em 0.5em 0.2em 0.8em',
            color: 'rgb(255, 255, 255)',
            backgroundColor: 'rgba(0, 20, 39, 0.88)',
            borderRadius: '1em',
            margin: 0,
            marginTop: '-1em',
            fontSize: '.75rem',
            alignItems: 'center',
          }}>
            {c.name}
            {/* <span style={{display: 'block'}}> */}
              {c.type.map(p=>
                <img 
                  src={`/img/power-${p}.png`} alt={p}
                  style={{width: '1.33em', display: 'inline-block', margin: '0 0 0 0.5ch'}}
                />
              )}
            {/* </span> */}
          </h5>
        </article>
      )}
    </div>
  )
}

export default Catches
