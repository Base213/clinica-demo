import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css'
import Home from './Home';
//import Inicio from './Inicio';
import LoginForm from './LoginForm';
import WelcomePage from './WelcomePage';
import LoadDoctors from './LoadDoctors';
import TakeTurns from './TakeTurns';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/Welcome" element={<WelcomePage />} />
        <Route path="/Doctors" element={<LoadDoctors />} />
        <Route path="/TakeTurns" element={<TakeTurns />} />
      </Routes>
    </Router>
  );
};

export default App;
