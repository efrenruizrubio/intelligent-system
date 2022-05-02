import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "pages/Login";
import Register from "pages/Register";
import Dashboard from "pages/Dashboard";
import Diseases from "pages/Diseases";
import Patients from "pages/Patients";
import History from "pages/History";
import { Particles, Layout } from "components";

function App() {
  return (
    <div className="app">
      <Particles />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="diseases" element={<Diseases />} />
          <Route path="patients" element={<Patients />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
