import { useEffect } from "react";
import { selectModeSong, backMenuSong } from "../../functions/songs";
import { useGame } from "../../hooks/useGame";
import { RankList } from "../RankList";
import "./styles.scss";

function MenuStart() {
  const { gameMode, setGameMode, setTime, rankList, setRankList } = useGame();
  const ONE_MINUTE = 60000;
  const FREE_MINUTES = 0;

  const handleMode = (mode) => {
    selectModeSong();
    setGameMode(mode);
  };

  const handleRank = () => {
    selectModeSong();
    setRankList(true)
  };

  const handleBack = () => {
    setGameMode(false);
    backMenuSong();
  };

  useEffect(() => {
    if (gameMode === "free") {
      setTime(FREE_MINUTES);
    }
    if (gameMode === "timed") {
      setTime(ONE_MINUTE);
    }
  }, [gameMode, setTime]);

  return (
    <>
      {rankList && <RankList />}
      {!gameMode ? (
        <div className="menu-start">
          SELECT MODE
          <div className="menu-start__buttons">
            <button
              className="btn btn__save"
              onClick={() => handleMode("free")}
            >
              FREE MODE
            </button>
            <button
              className="btn btn__alert"
              onClick={() => handleMode("timed")}
            >
              TIMED MODE
            </button>
          </div>
          <div className="rank-list" onClick={handleRank}>
            <span className="material-icons star-icon">star</span>
            TOP 10 SCORES
          </div>
        </div>
      ) : (
        <div className="game-mode">
          <div className="game-mode__title">{gameMode?.toUpperCase()} MODE</div>
          {gameMode === "timed" && (
            <p className="menu-start__text timed-text">
              This mode gives you 1 minute to write as many words as you can.
            </p>
          )}
          {gameMode === "free" && (
            <p className="menu-start__text free-text">
              This mode has no time limit for writing the words.
            </p>
          )}
          <div className="menu-start__back" onClick={handleBack}>
            ← BACK TO SELECT MODE
          </div>
          <div className="start">
            PRESS
            <span className={gameMode}> ENTER </span>
            TO START...
          </div>
        </div>
      )}
    </>
  );
}

export { MenuStart };
