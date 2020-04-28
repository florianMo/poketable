import React, {useState} from 'react';
import rankingPush from '../fx/rankingPush';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import css from '../css';
import Catches from './Catches';
import Grid from '@material-ui/core/Grid';
import RankingTable from './RankingTable';
import countScore from "../fx/countScore";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReplayIcon from '@material-ui/icons/Replay';


const Finish = ({lastRound, results, setResults, setLastRound, goToInit, goToPlay}) => {

  const [name, setName] = useState('');
  const {score, config, date, catches} = lastRound;
  const [popup, setPopup] = useState(score>0);

  const handleSubmit = (e) => {
    console.log('Votre parfum favori est : ' + name);
    let newResults = rankingPush(results, config, score, date, name );
    setResults({...newResults});
    setPopup(false);
    // setLastRound({yes: 'yes'});
    e.preventDefault();
  }

  return (
    <>
      <Grid container style={{ ...css.screen, flexDirection: 'row', alignItems: 'flex-start', overflow: 'auto', padding: '0 1rem'}}>
        <Grid item xs={9} >
          <Catches list={catches}></Catches>
        </Grid>
        <Grid item xs={3} style={{padding: '1rem 0'}}>
          <div style={{paddingBottom: '1rem', textAlign: 'center'}}>
            <Button 
              onClick={()=>goToInit()}
              disableRipple
              variant="contained"
              size="large"
              style={{
                backgroundColor: '#FFF',
                marginRight: '1.2rem',
              }}
            ><ArrowBackIcon /> Retour
            </Button>
            <Button 
              onClick={()=>goToPlay()}
              disableRipple
              variant="contained"
              size="large"
              style={{
                backgroundColor: '#FFF',
              }}
            ><ReplayIcon /> Rejouer
            </Button>
          </div>
          <RankingTable results={results} type={config.multi} lastDate={lastRound.date} />
        </Grid>
      </Grid>

      {popup &&
        <div style={{ ...css.screen, backgroundColor: 'rgba(0,0,0,.7)' }}>
          <Paper elevation={24} style={{ ...css.paper }}>
            <h2 style={{marginTop: 0}}>
              Bravo, tu viens de faire :<br/>
              <span style={{color: '#de063a',}}>
                {countScore(
                  config.multi, 
                  config[config.multi?'multiMax':'addiMax'],
                  score
                )} points
              </span> 
              </h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <label style={{display: 'block'}}>Comment t'appelles-tu ?</label><br/>
              <InputBase 
                type="text" 
                name="pokefirstname" 
                value={name} 
                onChange={(e)=>setName(e.target.value.toUpperCase())} 
                placeholder={'Ton prénom'}
                autoFocus
                style={{backgroundColor:'#EEE', width: '100%', paddingLeft: '1rem'}}
              />
              <div style={{textAlign: 'center', paddingTop: '1rem'}}>
                <Button 
                  type="submit"
                  aria-label="ok"
                  variant="contained"
                  color="secondary"
                  disabled={name===''}
                  disableRipple
                >
                  <ArrowForwardRoundedIcon />
                </Button>
              </div>
            </form>
            {/* <pre><strong>lastRound:</strong> {JSON.stringify(lastRound, null, 2)}<br/></pre> */}
          </Paper>
        </div>
    }
      
    </>
  )
}

export default Finish
