// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './frontend/LoginPage.jsx';
import Registration from './frontend/Registration.jsx';
import UserDash from './frontend/UserDash.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes for Login and Registration */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dash" element={<UserDash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
