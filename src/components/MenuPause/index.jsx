import React from "react";
import { useGame } from "../../hooks/useGame";
import { usePlayer } from "../../hooks/usePlayer";
import { Timer } from "../Timer";
import randomWords from "random-words";
import "./styles.css";

function MenuPause() {
  const { setTime, setPause, setWord, setPosition } = useGame();
  const { setScore, score } = usePlayer();

  const handleRestart = () => {
    console.log("RESTART");
    setTime(0);
    setScore(0);
    setPosition(0);
    setWord(randomWords());
    setPause(false);
  };
  const handleSave = () => {
    console.log("SAVE");
  };

  return (
    <div>
      <div className="menu-pause">
        <div>GAME PAUSED</div>
        <button className="btn btn__restart" onClick={handleRestart}>
          RESTART
        </button>
        <button className="btn btn__save" onClick={handleSave}>
          SAVE
        </button>
        <div className="menu-timer__div">
          <Timer />
          <span className="timer__div--score">SCORE: {score}</span>
        </div>
      </div>
      <div className="return-game">PRESS SPACE-BAR TO CONTINUE...</div>
    </div>
  );
}

export { MenuPause };
