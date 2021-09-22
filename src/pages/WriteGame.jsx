import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { MenuStart } from "../components/MenuStart";
import { StopWatch } from "../components/StopWatch";
import { usePlayer } from "../hooks/usePlayer";
import { useGame } from "../hooks/useGame";
import { beepSong, startSong, selectModeSong } from "../functions/songs";
import randomWords from "random-words";
import { MenuPause } from "../components/MenuPause";
import themeSong from "../assets/audio/themeSong.mp3";
import "../styles/WriteGame.css";

function WriteGame() {
  const [letter, setLetter] = useState("");
  const [animation, setAnimation] = useState(false);
  const [muteSong, setMuteSong] = useState(false);
  const [audio, setAudio] = useState(new Audio(themeSong));
  const history = useHistory();

  const {
    start,
    setStart,
    word,
    setWord,
    writtenWord,
    setWrittenWord,
    pause,
    setPause,
    position,
    setPosition,
    setSound,
    sound,
    gameMode,
  } = useGame();
  const { score, setScore, nickname } = usePlayer();

  const correctWord = () => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 500);
  };

  useEffect(() => {
    if (muteSong) return audio.pause();
    if (sound) return audio.play();
    if (!sound) return audio.pause();
  }, [sound, audio, muteSong]);

  useEffect(() => {
    console.log(process.env.REACT_APP_HOST)

    audio.addEventListener(
      "ended",
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );

    if (nickname.trim().length < 1) return history.push("/");
    window.addEventListener("keydown", (event) => {
      setLetter("");
      setLetter(event.key);
      if (event.key === "Enter") return setStart(true);
    });
  }, []);

  useEffect(() => {
    const isSameLetter = word.charAt(position) === letter.toLowerCase();

    if (letter === "Enter") {
      if (gameMode && !start) {
        startSong();
      }

      if (!gameMode) return setStart(false);
    }

    if (start && letter === " ") {
      setLetter("");
      selectModeSong();
      setSound((e) => !e);
      return setPause((e) => !e);
    }

    if (start) {
      if (position === word.length) {
        setPosition(0);
        setScore(score + 1);
        setWrittenWord("");
        beepSong();
        correctWord();
        return setWord(randomWords());
      }

      if (isSameLetter && !pause) {
        setWrittenWord(writtenWord + letter);
        setLetter("");
        return setPosition(position + 1);
      }
    }
  }, [
    letter,
    position,
    score,
    word,
    writtenWord,
    start,
    setScore,
    gameMode,
    setStart,
    setSound,
    setPause,
    pause,
    setPosition,
    setWrittenWord,
    setWord,
  ]);

  return (
    <div className="App">
      <div className="App-container">
        {start ? (
          <>
            {!pause ? (
              <div>
                <span className="words words__fixed">{word.toUpperCase()}</span>
                <span className={`words words__correct ${gameMode}`}>
                  {writtenWord.toUpperCase()}
                </span>
                <div className="timer__div">
                  <StopWatch paused={pause} />
                </div>

                <span className="score">
                  SCORE: {score}
                  <span className={`score__animation ${gameMode}`}>
                    {animation && "+1"}
                  </span>
                </span>
              </div>
            ) : (
              <MenuPause />
            )}
          </>
        ) : (
          <MenuStart />
        )}
      </div>
      {!pause && start && (
        <div className="pause-game">PRESS SPACE-BAR TO PAUSE...</div>
      )}
      <span
        className="material-icons game-volume"
        onClick={() => setMuteSong((e) => !e)}
      >
        {muteSong ? "volume_off" : "volume_up"}
      </span>
    </div>
  );
}

export { WriteGame };
