import { useContext } from "react";
import GameConsumer from "../contexts/GameContext";

const useGame = () => useContext(GameConsumer);

export { useGame };
