import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, 'database.json');

// Function to read data from the text file
export function readData() {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading database file:', error);
    return [];
  }
}

// Function to write data to the text file
export function writeData(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

// Function to add or update a competitor's scores
export function updateCompetitor(name, sport, score) {
  const data = readData();
  let competitor = data.find(c => c.name === name);

  if (!competitor) {
    competitor = { name, totalScore: 0, scores: [] };
    data.push(competitor);
  }

  competitor.scores.push({ sport, score });
  competitor.totalScore = competitor.scores.reduce((total, s) => total + s.score, 0);

  writeData(data);
}

// Function to get a competitor's information
export function getCompetitor(name) {
  const data = readData();
  return data.find(c => c.name === name) || null;
}

// Function to get all competitors' information sorted by total score
export function getAllCompetitors() {
  const data = readData();
  return data.sort((a, b) => b.totalScore - a.totalScore);
}
