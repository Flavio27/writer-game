import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { StopWatch } from "../components/StopWatch";
import { usePlayer } from "../hooks/usePlayer";
import { useGame } from "../hooks/useGame";
import randomWords from "random-words";
import { MenuPause } from "../components/MenuPause";
import "../styles/WriteGame.css";

function WriteGame() {
  const [writtenWord, setWrittenWord] = useState("");
  const [letter, setLetter] = useState("");
  const [start, setStart] = useState(false);
  const history = useHistory();

  const { word, setWord, pause, setPause, position, setPosition } = useGame();
  const { score, setScore, nickname } = usePlayer();

  useEffect(() => {
    if (nickname.trim().length < 1) return history.push("/");
    window.addEventListener("keydown", (event) => {
      setLetter("");

      setLetter(event.key);
      if (event.key === "Enter") return setStart(true);
    });
  }, []);

  useEffect(() => {
    const isSameLetter = word.charAt(position) === letter;
    if (start && letter === " ") {
      setLetter("");
      return setPause((e) => !e);
    }
    if (start) {
      if (position === word.length) {
        setPosition(0);
        setScore(score + 1);
        setWrittenWord("");
        return setWord(randomWords());
      }

      if (isSameLetter) {
        setWrittenWord(writtenWord + letter);
        setLetter("");
        return setPosition(position + 1);
      }
    }
  }, [letter, position, score, word, writtenWord, start, setScore]);

  return (
    <div className="App">
      <div className="App-container">
        {start ? (
          <>
            {!pause ? (
              <div>
                <span className="words words__fixed">{word.toUpperCase()}</span>
                <span className="words words__correct">
                  {writtenWord.toUpperCase()}
                </span>
                <div className="timer__div">
                <StopWatch paused={pause} />
                </div>
                
                <span className="score">SCORE: {score}</span>
              </div>
            ) : (
              <MenuPause />
            )}
          </>
        ) : (
          <span className="start">
            PRESS <span className="highlighted">ENTER</span> TO START...
          </span>
        )}
      </div>
    </div>
  );
}

export { WriteGame };
