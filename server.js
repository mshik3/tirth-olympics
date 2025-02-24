import express from "express";
import { readData, updateCompetitor } from "./db.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: ['http://localhost:3000'], // Add your frontend domain here
};

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors(corsOptions));

// Endpoint to get scores
app.get("/api/scores", (req, res) => {
  try {
    const scores = readData();
    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to update scores
app.post("/api/scores", (req, res) => {
  const { name, points, sport } = req.body;
  try {
    updateCompetitor(name, sport, points);
    res.status(201).json({ message: "Score updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
