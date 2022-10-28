import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Opening } from "./Pages/Opening";
import { Register } from "./Pages/Register";
import { Reservation } from "./Pages/Reservation";
import { Signin } from "./Pages/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Opening />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Signup" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
