import { createContext, useState } from "react";
import randomWords from "random-words";

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const [time, setTime] = useState(0);
  const [pause, setPause] = useState(false);
  const [word, setWord] = useState(randomWords());
  const [position, setPosition] = useState(0);

  return (
    <GameContext.Provider
      value={{
        pause,
        setPause,
        time,
        setTime,
        word,
        setWord,
        position,
        setPosition,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const GameConsumer = GameContext.Consumer;

export default GameContext;
