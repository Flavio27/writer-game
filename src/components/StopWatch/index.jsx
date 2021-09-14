import React, { useEffect } from "react";
import { useGame } from "../../hooks/useGame";
import { Timer } from "../Timer";
import "./styles.css";

function StopWatch() {
  const { setTime, time, pause, setPause, gameMode, setEndTime} = useGame();

  useEffect(() => {
    let interval = null;
    if (pause === false) {
      if (gameMode === "free"){
        interval = setInterval(() => {
          setTime((time) => time + 10);
        }, 10);
      }else{
        interval = setInterval(() => {
          setTime((time) => time -10);
        }, 10);
      }

    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [pause, setTime]);

  useEffect(() => {
    if (gameMode === "timed" && time === 0){
      setEndTime(true);
      return setPause(true)
    }
  }, [time])


  return (
    <div className="stop-watch">
      <Timer />
    </div>
  );
}

export { StopWatch };
