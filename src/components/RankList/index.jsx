import React, { useEffect, useState } from "react";
import { rankAPI } from "../../services/api";
import { useGame } from "../../hooks/useGame";
import "./styles.scss";
import { backMenuSong } from "../../functions/songs";

function RankList() {
  const { setRankList } = useGame();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  const sortByScore = (rank) => {
    const orderedList = rank.sort(function (a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });
    return orderedList;
  };

  const handleBack = () => {
    setRankList(false);
    backMenuSong();
  };

  useEffect(() => {
    const getRankList = async () => {
      setIsLoading(true);
      try {
        const response = await rankAPI.get("/rank");
        const ordered = await sortByScore(response.data);
        setList(ordered);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
      }
    };

    getRankList();
  }, []);

  return (
    <div className="menu-rank">
      <div className="close-div">
        <span className="material-icons" onClick={handleBack}>
          close
        </span>
      </div>
      {isLoading ? (
        <span>carregando...</span>
      ) : (
        <table id="customers">
          <tbody>
            <tr className="header-rank">
              <th>RANK</th>
              <th>NAME</th>
              <th>SCORE</th>
            </tr>
            {list.map((rank, index) => (
              <tr className="body-rank">
                <td>{index + 1}º</td>
                <td>{rank.name}</td>
                <td>{rank.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export { RankList };
