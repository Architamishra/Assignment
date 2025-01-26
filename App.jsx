import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Student from "./Student";
import Auth from "./Auth";
import Stu from "./Stu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/student" element={<Student />} />
        <Route path="/" element={<Auth />} /> {/* Home/Auth route */}
        <Route path="/stu" element={<Stu />} /> {/* Stu route */}
      </Routes>
    </Router>
  );
}

export default App;
