import React, { useEffect } from "react";
import { endTimeSong } from "../../functions/songs";
import { rankAPI } from "../../services/api";
import { usePlayer } from "../../hooks/usePlayer";
import { useGame } from "../../hooks/useGame";

import { Timer } from "../Timer";
import "./styles.css";

function StopWatch() {
  const { score, nickname } = usePlayer();

  const { setTime, time, pause, setPause, gameMode, setEndTime, setSound } =
    useGame();

  useEffect(() => {
    let interval = null;
    if (pause === false) {
      if (gameMode === "free") {
        interval = setInterval(() => {
          setTime((time) => time + 10);
        }, 10);
      } else {
        interval = setInterval(() => {
          setTime((time) => time - 10);
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
    if (gameMode === "timed" && time === 0) {
      endTimeSong();
      setSound(false);
      setEndTime(true);

      rankAPI.post("/rank", {
        name: nickname || "unknown",
        score,
      });

      return setPause(true);
    }
  }, [time]);

  return (
    <div className="stop-watch">
      <Timer />
    </div>
  );
}

export { StopWatch };
