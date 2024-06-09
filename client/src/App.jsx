import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';


const App = () => {

  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/home" element={ token ? <Home /> : <Navigate to="/login" /> } />
    </Routes>
  );
};

export default App;
