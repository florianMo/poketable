import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import createKeyboard from "../fx/createKeyboard";
import createRiddle from "../fx/createRiddle";
import positionAbsolute from "../fx/positionAbsolute";
import Target from "./Target";
import Display from "./Display";
import Timer from "./Timer";
// import Catches from './Catches';
import Button from "@material-ui/core/Button";
import PokedexSvg from "../svgs/PokedexSvg";
import css from "../css";
import NotificationList from "./NotificationList";
import avatars from "../data/avatars";
import Backgroundgradiant from "./Backgroundgradiant";

const pokedexSize = 4.5;
const timeBeforeEnd = 2500; // Une fois qu'on a perdu

// TODO : vérifier si 'moment' est utile dans Board

const cssPokedexWrapper = (pokedexSize) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: `${10 * pokedexSize}rem`,
    height: `${7.2 * pokedexSize}rem`,
    marginLeft: `${(-10 / 2) * pokedexSize}rem`,
    marginTop: `${(-7.2 / 2) * pokedexSize}rem`,
  };
};

const Board = ({
  config,
  moment,
  update,
  pokelist,
  pokeIndex,
  initRound,
  playSound,
}) => {
  const multi = config.multi;
  const [isStarted, setIsStarted] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [round, setRound] = useState(0);
  const [riddle, setRiddle] = useState({});
  const [lives, setLives] = useState(initRound.lives);
  const [catches, setCatches] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const keyboard = createKeyboard(config);

  useEffect(() => {
    // Detecter le lancement du jeu :
    if (moment === "play" && !isStarted) {
      setIsStarted(true);
      setRiddle(createRiddle(config));
    }
  }, [moment]);

  useEffect(() => {
    // Detecter le lancement du jeu :
    if (isLost) {
      console.log("PERDU TOTAL QUOI !");
      //Calcul Score :
      // let score = countScore(round, config);
      setTimeout(() => {
        update("status-lost", round, catches);
      }, timeBeforeEnd);
    }
  }, [isLost]);

  const handleKey = (n) => {
    if (n === riddle.s) {
      console.log("Gagné!");
      playSound("success");
      addNotif("success");
      setCatches([...catches, pokelist[round + pokeIndex]]);
      setRound(round + 1);
      setRiddle(createRiddle(config));
    } else {
      if (lives > 0) {
        playSound("fail");
        console.log("Nope!");
        addNotif("error");
        setLives(lives - 1);
      } else {
        playSound("loose");
        console.log("Perdu!");
        setIsLost(true);
        addNotif("error");
      }
    }
  };
  const addNotif = (type) => {
    setNotificationList([...notificationList, type]);
  };

  const timerFeedback = (msg) => {
    // console.log('timerFeedback', msg);
    if (msg === 0) {
      setIsLost(true);
    }
  };

  return (
    <>
      <Backgroundgradiant color1={"#f58ed4"} color2={"#61aaf1"} />
      <Button
        style={{ position: "absolute", top: ".5rem", left: ".5rem" }}
        size="small"
        onClick={() => update("status-abort", round)}
        disableRipple
      >
        Retour
      </Button>
      <div
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          bottom: "2rem",
        }}
      >
        <img
          src={`/poketable/img/avatars_full/${avatars[config.avatar].imgFull}`}
          alt=""
          style={{
            height: "100%",
            width: "auto",
            opacity: 0.9,
            filter: "blur(.067rem)",
            marginLeft: "auto",
          }}
        />
      </div>
      />
      <div style={{ ...cssPokedexWrapper(pokedexSize) }}>
        {/* <pre><strong>catches:</strong> {JSON.stringify(catches, null, 2)}<br/></pre> */}

        <PokedexSvg />

        <Timer
          time={initRound.timer}
          timerFeedback={(msg) => timerFeedback(msg)}
          timerActive={isStarted && !isLost}
          style={{ ...positionAbsolute(7, 8, 13, "auto") }}
          playSound={(s)=>playSound(s)}
        />
        <Target
          pokelist={pokelist}
          round={round}
          isStarted={isStarted}
          pokeIndex={pokeIndex}
          style={{ ...positionAbsolute(8, 33, 37, 53) }}
        />
        <NotificationList
          list={notificationList}
          style={{ ...positionAbsolute(55, 24, 41, 7) }}
        />
        <Display
          round={round}
          riddle={riddle}
          lives={lives}
          multi={multi}
          isLost={isLost}
          style={{ ...positionAbsolute(54, 31, 39, 12) }}
        />
        <div
          className="keyboard"
          style={{
            ...positionAbsolute(54, 45, 39, "auto"),
            ...css.keyboard,
            opacity: isLost ? 0.3 : 1,
            pointerEvents: isLost ? "none" : "auto",
          }}
        >
          {keyboard.map((n) => (
            <motion.button
              className="key"
              key={n}
              onClick={() => handleKey(n)}
              whileHover={{ backgroundColor: "#0093C6" }}
              whileTap={{
                backgroundColor:
                  n === riddle.s
                    ? "#22e30d"
                    : lives > 1
                    ? "#ffa400"
                    : "#ff4600",
              }}
              transition={{ duration: 0 }}
              style={{
                ...css.keyboardButton,
                width: keyboard.length < 30 ? "20%" : "10%",
                fontSize: keyboard.length >= 30 ? ".8rem" : "1.2rem",
                height: keyboard.length >= 80 ? "1.4rem" : "2rem",
              }}
            >
              {n}
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
