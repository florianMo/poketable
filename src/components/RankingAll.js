import React, {useState} from 'react'
// import { makeStyles } from '@material-ui/core/styles';

import RankingTable from './RankingTable';
import Backgroundgradiant from './Backgroundgradiant';
import Button from '@material-ui/core/Button';

const RankingAll = ({config, results, lastRound, goToInit}) => {

  return (
    <div style={{
      maxHeight:'100vh', 
      overflow: 'auto', 
      padding: '2rem', 
      display: 'flex',
      flexDirection: 'row', 
      width: '100%',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{position: 'relative', zIndex: 1,}}>
        <h3 style={{marginTop: 0}}>Additions</h3>
        <RankingTable results={results} type={'multi'} lastDate={false} />
      </div>
      <div style={{padding: '2rem'}}></div>
      <div>
        <h3 style={{marginTop: 0}}>Multiplications</h3>
        <RankingTable results={results} type={'addi'} lastDate={false} />
      </div>
      <div style={{padding: '2rem'}}></div>
      <div>
        <Button 
          onClick={()=>goToInit()}
          disableRipple
          variant="contained"
          size="large"
          style={{
            backgroundColor: '#FFF',
          }}
        >retour
        </Button>
      </div>

    </div>
  )
}

export default RankingAll
