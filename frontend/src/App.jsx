import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadResume from "./pages/UploadResume";
import ProtectedRoute from "./components/ProtectedRoute"; // adjust path if needed
import Navbar from "./components/Navbar"; // optional navbar

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
