import { useGame } from "../../hooks/useGame";
import { usePlayer } from "../../hooks/usePlayer";
import { Timer } from "../Timer";
import randomWords from "random-words";
import "./styles.css";

function MenuPause() {
  const {
    setTime,
    setPause,
    setWord,
    setWrittenWord,
    setPosition,
    gameMode,
    setSound,
    endTime,
    setEndTime,
    setGameMode,
    setStart,
  } = useGame();
  const { setScore, score, nickname } = usePlayer();

  const ONE_MINUTE = 60000;

  const handleRestart = () => {
    setTime(0);
    setScore(0);
    setPosition(0);
    setWord(randomWords());
    setPause(false);
    setSound(true);
    if (gameMode === "timed") {
      setEndTime(false);
      setTime(ONE_MINUTE);
    }
    setWrittenWord("");
  };

  const handleSave = () => {
    console.log("SAVE");
  };

  const handleChangeMode = () => {
    handleRestart();
    setGameMode(false);
    setStart(false);
  };

  return (
    <div>
      <div className="menu-pause">
        {endTime ? <div>TIME IS OVER!</div> : <div>GAME PAUSED</div>}
        <button className="btn btn__restart" onClick={handleRestart}>
          RESTART
        </button>
        <button className="btn btn__save" onClick={handleSave}>
          SAVE
        </button>
        <div className="change-mode" onClick={handleChangeMode}>
          ↩ CHANGE GAME MODE
        </div>
        <div className="name-div">
          NAME: {nickname}
        </div>
        <div className="menu-timer__div">
          {!endTime && <Timer />}
          <span className="timer__div--score">SCORE: {score}</span>
        </div>
      </div>
      {!endTime && (
        <div className="return-game">PRESS SPACE-BAR TO CONTINUE...</div>
      )}
    </div>
  );
}

export { MenuPause };
