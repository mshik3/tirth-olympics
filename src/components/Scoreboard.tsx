import React, { useEffect, useState } from "react";
import "./Scoreboard.css";

interface Score {
  id: number;
  name: string;
  points: number;
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
        // Sort scores by points in descending order
        data.sort((a, b) => b.points - a.points);
        setScores(data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div>
      <h1>Scoreboard</h1>
      <div
        className="top-three"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 2nd Place */}
        {scores[1] && (
          <div
            key={scores[1].id}
            className="top-score top-score-2"
            style={{
              fontSize: "2em",
              flex: 2,
              textAlign: "center",
              margin: "0 10px",
            }}
          >
            <div>{`2. ${scores[1].name}`}</div>
            <div>{`${scores[1].points} points`}</div>
          </div>
        )}
        {/* 1st Place */}
        {scores[0] && (
          <div
            key={scores[0].id}
            className="top-score top-score-1"
            style={{
              fontSize: "4em",
              flex: 4,
              textAlign: "center",
              margin: "0 10px",
            }}
          >
            <div>{`1. ${scores[0].name}`}</div>
            <div>{`${scores[0].points} points`}</div>
          </div>
        )}
        {/* 3rd Place */}
        {scores[2] && (
          <div
            key={scores[2].id}
            className="top-score top-score-3"
            style={{
              fontSize: "2em",
              flex: 1,
              textAlign: "center",
              margin: "0 10px",
            }}
          >
            <div>{`3. ${scores[2].name}`}</div>
            <div>{`${scores[2].points} points`}</div>
          </div>
        )}
      </div>
      <ul className="other-scores">
        {scores.slice(3).map((score, index) => (
          <li key={score.id}>{`${index + 4}. ${score.name} - ${
            score.points
          } points`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
