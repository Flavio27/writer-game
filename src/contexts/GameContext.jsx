import { createContext, useState } from "react";
import randomWords from "random-words";

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const [pause, setPause] = useState(false);
  const [word, setWord] = useState(randomWords());
  const [writtenWord, setWrittenWord] = useState("");
  const [position, setPosition] = useState(0);
  const [gameMode, setGameMode] = useState(false);
  const [sound, setSound] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [rankList, setRankList] = useState(false);

  return (
    <GameContext.Provider
      value={{
        start,
        setStart,
        pause,
        setPause,
        time,
        setTime,
        word,
        setWord,
        writtenWord,
        setWrittenWord,
        position,
        setPosition,
        gameMode,
        setGameMode,
        sound,
        setSound,
        endTime,
        setEndTime,
        rankList,
        setRankList,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const GameConsumer = GameContext.Consumer;

export default GameContext;
