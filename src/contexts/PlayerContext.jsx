import { createContext, useState } from "react";

const PlayerContext = createContext();

export function PlayerContextProvider({ children }) {
  const [score, setScore] = useState(0);
  const [nickname, setNickname] = useState("");

  return (
    <PlayerContext.Provider
      value={{
        score,
        setScore,
        nickname,
        setNickname,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const PlayerConsumer = PlayerContext.Consumer;

export default PlayerContext;
