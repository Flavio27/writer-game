import React from "react";
import { useGame } from "../../hooks/useGame";

import "./styles.css";

function Timer(props) {
  const { time } = useGame();

  return (
    <div>
      <span className="digits">
        TIME:  {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}

export { Timer };
