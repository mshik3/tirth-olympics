import React from "react";
import { Route, Routes } from "react-router-dom";
import Scoreboard from "./components/Scoreboard";
import Admin from "./components/Admin";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Scoreboard />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;
