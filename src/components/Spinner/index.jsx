import React from "react";
import "./styles.scss";

function Spinner({ color }) {
  return (
    <div className="loader-div">
      <div className={`loader ${color}`} />
      <div className="loader-text">LOADING...</div>
    </div>
  );
}

export { Spinner };
