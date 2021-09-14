import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { usePlayer } from "../hooks/usePlayer";
import { useGame } from "../hooks/useGame";
import audio2 from "../assets/audio/audio2.mp3";
import "../styles/Home.css";

function Home() {
  const [inputName, setInputName] = useState("");
  const { nickname, setNickname } = usePlayer();
  const { sound, setSound } = useGame();
  const [error, setError] = useState(true);
  const history = useHistory();

  const handleChange = (value) => {
    setInputName(value);
  };
  const handlePlay = () => {
    if (!error) {
      setNickname(inputName);
      setSound(true)
      history.push("/game");
    }
  };


  useEffect(() => {
    const audio = new Audio(audio2);
    if (sound) return audio.play()
    if (!sound) return audio.pause()
  }, [sound]);

  useEffect(() => {
    const inputSize = inputName.trim().length;

    if (inputSize >= 3 && inputSize <= 15) {
      return setError(false);
    } else {
      return setError(true);
    }
  }, [inputName]);

  return (
    <div className="App">
      <header className="App-container">
        <div className="login">
          <div>
            <input
              className={`login__input ${error && "login__input--error"}`}
              type="text"
              placeholder="YOUR NAME"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <button
            className="btn btn__save"
            disabled={error}
            onClick={handlePlay}
          >
            PLAY
          </button>
        </div>
      </header>
    </div>
  );
}

export { Home };
