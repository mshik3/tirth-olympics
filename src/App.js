import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scoreboard from './components/Scoreboard.js';
import Admin from './components/Admin.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Scoreboard />} />
      </Routes>
    </Router>
  );
}

export default App;
