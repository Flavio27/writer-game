import React from "react";
import { useGame } from "../../hooks/useGame";
import { Timer } from "../Timer";
import "./styles.css";

function StopWatch() {
  const { setTime, pause } = useGame();

  React.useEffect(() => {
    let interval = null;
    if (pause === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [pause, setTime]);

  return (
    <div className="stop-watch">
      <Timer />
    </div>
  );
}

export { StopWatch };
