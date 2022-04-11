import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "pages/Login";
import Register from "pages/Register";
import Dashboard from "pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
