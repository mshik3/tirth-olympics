import express from 'express';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to get scores
app.get('/api/scores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM scores');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to update scores
app.post('/api/scores', async (req, res) => {
    const { name, points, sport, team } = req.body;
    try {
        await pool.query('INSERT INTO scores (name, points, sport, team) VALUES ($1, $2, $3, $4)', [name, points, sport, team]);
        res.status(201).json({ message: 'Score updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
