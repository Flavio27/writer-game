import { Route, BrowserRouter, Switch } from "react-router-dom";
import { PlayerContextProvider } from "../contexts/PlayerContext";
import { GameContextProvider } from "../contexts/GameContext";
import { Home } from "./Home";
import { WriteGame } from "./WriteGame";

function Routes() {
  return (
    <BrowserRouter>
      <PlayerContextProvider>
        <GameContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/game" component={WriteGame} />
            <Route component={Home} />
          </Switch>
        </GameContextProvider>
      </PlayerContextProvider>
    </BrowserRouter>
  );
}

export { Routes };
