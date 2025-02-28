import React, { useEffect, useState } from "react";
import "./Scoreboard.css";

interface Score {
  id: number;
  name: string;
  points: number;
  totalScore: number;
}

const Scoreboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/scores`
        );
        const data: Score[] = await response.json();
        console.log("setting score data to", data);
        // Sort scores by totalScore in descending order
        data.sort((a, b) => b.totalScore - a.totalScore);
        setScores(data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);

  const TopThree: React.FC<{ scores: Score[] }> = ({ scores }) => {
    const reorderedScores = [scores[1], scores[0], scores[2]]; // 2nd, 1st, 3rd
    return (
      <div className="top-three">
        {reorderedScores.map((player, index) => (
          <div
            key={player.name}
            className={`top-score top-score-${index}`}
            style={{ flexGrow: index === 1 ? 2 : 3 }}
          >
            <img
              src={`/images/${
                index === 1 ? "first" : index === 0 ? "second" : "third"
              }-place.png`}
              alt={`${
                index === 1 ? "First" : index === 0 ? "Second" : "Third"
              } Place`}
              style={{
                height: index === 1 ? "150px" : "100px",
                width: index === 1 ? "150px" : "100px",
                objectFit: "contain",
              }}
            />
            <div className="placeName">{player.name}</div>
            <div className="topPoints">{player.totalScore} points</div>
          </div>
        ))}
      </div>
    );
  };

  const ImageRow: React.FC = () => {
    return (
      <div className="image-row">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="image-box"
            style={{
              backgroundImage: `url('/images/tirth-${num}.png')`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">Tirth Olympics</h1>
      <ImageRow />
      {scores.length >= 3 && <TopThree scores={scores.slice(0, 3)} />}
      <div className="score-list">
        {scores.slice(3).map((player) => (
          <div key={player.name} className="score">
            <span className="name">{player.name}</span>
            <span className="points"> {player.totalScore} points</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
