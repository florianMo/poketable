import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slider from '@material-ui/core/Slider';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import TitleSvg from '../svgs/TitleSvg';
import avatars from '../data/avatars';
import {motion, AnimatePresence} from 'framer-motion';
import css from '../css';
import AddIcon from '@material-ui/icons/Add';


// config: {
//   multi: true,
//   multiMax: 5,
//   addiMax: 10,
// }

const Config = ({ config, update, onPlay, gotToRanking, playSound }) => {

  const handleSliderChange = (event, newValue, name) => {
    console.log((config.multi && config.multiMax !== newValue),'||',    (!config.multi && config.addiMax !== newValue))
    // TODO : pas normal de ne cible que multimax
    if (
      (config.multi && config.multiMax !== newValue) ||
      (!config.multi && config.addiMax !== newValue)
    ) {
      update({ [name]: newValue });
      playSound('tick');
    }
  };

  return (
    <>
      <Paper elevation={24} style={{ ...css.paper, width: '30rem', }}>

        <TitleSvg style={{ margin: '0 10%' }} />

        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:.5,duration: 1}}
        >

          <br/>
          <ButtonGroup disableRipple style={{width: '100%',display: 'flex'}}>
            {avatars.map((a,i)=>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                disableRipple
                style={{
                  display:'block',
                  backgroundColor: (i===config.avatar) ? '#2196f3': '#e6eaed',
                  opacity: (i===config.avatar) ? '#2196f3': '#e6eaed',
                  flex: 1,
                  padding: 0,
                }}
                onClick={()=>{
                  playSound('tick');
                  update({ avatar: i });
                }}
                key={a.name}
              >
                <img src={`/img/avatars_portrait/${a.imgPortrait}`} alt='' style={{
                  maxWidth: '100%',
                  opacity: (i===config.avatar) ? 1: .7,
                  }}/>
                {a.name}
              </Button>
            )}
          </ButtonGroup>
          <br/>
          <ButtonGroup disableRipple style={{width: '100%',display: 'flex', padding: '0 25%'}}>
            {[
              {name:'addition', v: false},
              {name: 'multiplication', v:true},
            ].map((t,i)=>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                style={{
                  display:'block',
                  backgroundColor: (t.v===config.multi) ? '#2196f3': '#cfd6dc',
                  flex: 1,
                  padding: 0,
                  width: '30%',
                  overflow: 'hidden',
                }}
                onClick={()=>{
                  playSound('tick');
                  update({ multi: t.v });
                }}
                disableRipple
                key={t.name}
              ><div style={{
                filter: 'drop-shadow(.15rem .2rem 0 navy)',
                opacity: (t.v===config.multi) ? 1: .7,
              }}>
                <AddIcon
                  style={{
                    fontSize: '3rem',
                    color: 'yellow',
                    transform: `rotate(${t.v?'45':'0'}deg)`,
                    marginBottom: '-.5rem',
                    marginTop: '-.2rem',
                  }}
                /></div>
                <div>{t.name}</div>
              </Button>
            )}
          </ButtonGroup>
          <br/>

          <div style={{height:'4rem', position: 'relative'}}>
            <AnimatePresence initial={false}>
              {!config.multi && 
              <motion.div
                initial={{opacity:0, x:-99, }}
                animate={{opacity:1, x:0, }}
                exit={{opacity:0, x:-99, }}
                style={{position: 'absolute', width:'80%',left:'10%',top:0}}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 200 },
                  opacity: { duration: 0.2 }
                }}
              >
                <FormControl component="fieldset" fullWidth margin='normal'>
                  <FormLabel component="legend" style={{ width: '100%' }}>
                    Additions jusqu'à : <strong style={{ float: 'right' }}>+ {config.addiMax}</strong>
                  </FormLabel>
                  <Slider
                    value={typeof config.addiMax === 'number' ? config.addiMax : 0}
                    onChange={(e, v, n) => handleSliderChange(e, v, 'addiMax')}
                    aria-labelledby="input-slider"
                    min={10}
                    max={100}
                    step={10}
                    marks={true}
                  />
                </FormControl>
              </motion.div>
              }
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {config.multi && 
              <motion.div
                initial={{opacity:0, x:+99, }}
                animate={{opacity:1, x:0, }}
                exit={{opacity:0, x:+99, }}
                style={{position: 'absolute', width:'80%',left:'10%',top:0}}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 200 },
                  opacity: { duration: 0.2 }
                }}
              >
                <FormControl component="fieldset" fullWidth margin='normal'>
                  <FormLabel component="legend" style={{ width: '100%' }}>
                    Multiplication jusqu'à : <strong style={{ float: 'right' }}>x {config.multiMax}</strong>
                  </FormLabel>
                  <Slider
                    value={typeof config.multiMax === 'number' ? config.multiMax : 0}
                    onChange={(e, v, n) => handleSliderChange(e, v, 'multiMax')}
                    aria-labelledby="input-slider"
                    min={1}
                    max={10}
                    step={1}
                    marks={true}
                  />
                </FormControl>
              </motion.div>
              }
            </AnimatePresence>
          </div>

          <div style={{textAlign: 'center'}}>
            <Button
              onClick={()=>{
                playSound('tick');
                gotToRanking();
              }}
              disableRipple
              style={{color: '#666', marginRight: '2rem'}}
            >
              Classement
            </Button>
            <Button
              onClick={()=>{
                playSound('tick');
                onPlay();
              }}

              variant="contained"
              size="large"
              color="secondary"
              disableRipple
            >
              Jouer
            </Button>
          </div>

        </motion.div>


      </Paper>
    </>
  )
}

export default Config;
