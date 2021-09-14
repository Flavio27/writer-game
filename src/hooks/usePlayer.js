import { useContext } from "react";
import PlayerConsumer from "../contexts/PlayerContext";

const usePlayer = () => useContext(PlayerConsumer);

export { usePlayer };
