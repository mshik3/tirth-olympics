import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Scoreboard from "./components/Scoreboard";
import Admin from "./components/Admin";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scoreboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
