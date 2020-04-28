import React, {useState, useEffect} from 'react';

import UIfx from 'uifx';

import arrayShuffle from './fx/arrayShuffle';
import pokedex from './data/pokedex';

import Fab from '@material-ui/core/Fab';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import Config from './components/Config';
import Board from './components/Board';
import Finish from './components/Finish';
import Backgroundgradiant from './components/Backgroundgradiant';
import RankingAll from './components/RankingAll';
import AnimatedScreen from './components/AnimatedScreen';

import css from './css';

import audioDead from './sound/dead.wav'
import audioBump from './sound/bump.mp3'
import audioCoin from './sound/coin2.mp3'
import audioTick from './sound/tick.mp3'
import audioCount from './sound/count.mp3'

const soundSuccess = new UIfx(audioCoin, {volume: 1})
const soundLoose = new UIfx(audioDead, {volume: 1})
const soundFail = new UIfx(audioBump, {volume: 1})
const soundTick = new UIfx(audioTick, {volume: .25})
const soundCount = new UIfx(audioCount, {volume: .6})
// const audioTick = new UIfx(audioBip, {volume: 0.4})


// ---------- INIT ----------

const GAME = {
  config: {
    multi: true,
    multiMax: 5,
    addiMax: 10,
    avatar: 0,
    soundOn: true,
  },
  initRound: {
    timer: 90,
    lives: 2,
    catches: [],
    riddle: {},
  },
  i: 0,
  lastRound: {
    catches: [],
    config: {}, 
    score: 0,
    date:  '', 
  },
  moment: 'init'
}
const RESULTS = {
  addi:{10:[],20:[],30:[],40:[],50:[],60:[],70:[],80:[],90:[],100:[]},
  multi:{1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[]}
};
const localConfig = JSON.parse(localStorage.getItem('config'));
const localResults = JSON.parse(localStorage.getItem('results'));
const pokelist = arrayShuffle(pokedex);


// ---------- APP ----------

const App =()=> {

  const [config, setConfig] = useState({...GAME.config, ...localConfig});
  const [results, setResults] = useState({...RESULTS, ...localResults});
  // const [round, setRound] = useState(GAME.round);
  const [moment, setMoment] = useState(GAME.moment);
  const [pokeIndex, setPokeIndex] = useState(GAME.i);
  const [lastRound, setLastRound] = useState({});
  const {initRound} = GAME;

  useEffect(() => {
    console.log('useEffect config');
    localStorage.setItem('config',JSON.stringify(config));
  }, [config])
  useEffect(() => {
    console.log('useEffect results');
    localStorage.setItem('results',JSON.stringify(results));
  }, [results])
  
  // ---------- HANDLERS ----------
  
  const handleConfigMain = (v) => {
    setConfig({...config, ...v});
  }
  const handlePlay = () => {
    setConfig({...config});
    setMoment('play')
  }
  const boardUpdate = (status, score, catches) => {
    if (status==='status-abort') {
      console.log('ABORT');
      setPokeIndex(pokeIndex+score)
      setMoment('init')
    }
    if (status==='status-lost') {
      let newDate = new Date()
      setLastRound({
        catches: catches,
        config: config, 
        score: score,
        date: newDate.toISOString(), 
      })
      setMoment('finish')
      setPokeIndex(pokeIndex+score)
    }
  }

  const playSound = (s) => {
    if (config.soundOn) {
      switch (s) {
        case 'success':
          soundSuccess.play()
          break;
        case 'fail':
          soundFail.play()
          break;
        case 'loose':
          soundLoose.play()
          break;
        case 'tick':
          soundTick.play()
          break;
        case 'count':
          soundCount.play()
          break;
        default:
          break;
      }
    }
  }



  // ---------- CORE APP ----------
  return (
    <div className='App' style={css.app}>

      <Backgroundgradiant color1={'#08AEEA'} color2={'#2AF598'} />

      {(moment === 'init' || moment === 'play') &&
        <Fab 
          aria-label="sound on / off" 
          style={css.fab}
          onClick={()=> { setConfig({...config, soundOn: !config.soundOn}) }}
          disableRipple
        >
          {config.soundOn && <VolumeUpIcon />}
          {!config.soundOn && <VolumeOffIcon />}
        </Fab>
      }

      <AnimatedScreen forMoment={'init'} moment={moment} style={{overflow: 'hidden'}}>
        <Config 
          config={config}
          update={(v)=>handleConfigMain(v)}
          onPlay={()=>handlePlay(true)}
          gotToRanking={()=>setMoment('ranking')}
          playSound={(s)=>playSound(s)}
        />
      </AnimatedScreen>
      <AnimatedScreen forMoment={'play'} moment={moment}>
        <Board
          config={config}
          initRound={initRound}
          moment={moment}
          pokelist={pokelist}
          pokeIndex={pokeIndex}
          update={(status,score,catches)=>boardUpdate(status,score,catches)}
          playSound={(s)=>playSound(s)}
        />
      </AnimatedScreen>
      <AnimatedScreen forMoment={'finish'} moment={moment} style={{overflow: 'hidden'}}>
        <Finish 
          lastRound={lastRound} 
          config={config} 
          results={results} 
          setResults={(v)=>setResults(v)} 
          setLastRound={(v)=>setLastRound(v)}
          goToInit={()=>setMoment('init')}
          goToPlay={()=>handlePlay(true)}
        />
      </AnimatedScreen>
      <AnimatedScreen forMoment={'ranking'} moment={moment} style={{overflow: 'hidden'}}>
        <RankingAll 
          config={config} 
          results={results}
          goToInit={()=>setMoment('init')}
        />
      </AnimatedScreen>
      
    </div>
  );
}

export default App;
