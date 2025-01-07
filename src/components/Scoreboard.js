import React, { useEffect, useState } from 'react';

const Scoreboard = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch('/api/scores');
                const data = await response.json();
                setScores(data);
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div>
            <h1>Scoreboard</h1>
            <ul>
                {scores.map((score, index) => (
                    <li key={score.id}>{`${index + 1}. ${score.name} - ${score.points} points`}</li>
                ))}
            </ul>
        </div>
    );
};

export default Scoreboard;
