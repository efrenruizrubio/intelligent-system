import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "pages/Login";
import Register from "pages/Register";
import Dashboard from "pages/Dashboard";
import {Particles} from "components";

function App() {
  return (
    <div className="App">
      <Particles/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
