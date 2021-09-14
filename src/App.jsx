import { useEffect, useState } from "react";
import { StopWatch } from "./components/StopWatch";
import { usePlayer } from "./hooks/usePlayer";
import { useGame } from "./hooks/useGame";
import randomWords from "random-words";
import "./App.css";
import { MenuPause } from "./components/MenuPause";

function App() {
  const [writtenWord, setWrittenWord] = useState("");
  const [letter, setLetter] = useState("");
  const [start, setStart] = useState(false);

  const { word, setWord, pause, setPause, position, setPosition } = useGame();
  const { score, setScore } = usePlayer();

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      setLetter("");

      setLetter(event.key);
      if (event.key === "Enter") return setStart(true);
    });
  }, []);

  useEffect(() => {
    const isSameLetter = word.charAt(position) === letter;
    if (letter === " ") {
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
        return setPosition(position + 1);
      }
    }
  }, [letter, position, score, word, writtenWord, start, setScore]);

  return (
    <div className="App">
      <header className="App-header">
        {start ? (
          <>
            {!pause ? (
              <div>
                <span className="words words__fixed">{word.toUpperCase()}</span>
                <span className="words words__correct">
                  {writtenWord.toUpperCase()}
                </span>
                <StopWatch paused={pause} />
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
      </header>
    </div>
  );
}

export default App;
