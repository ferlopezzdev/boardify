import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';


const App = () => {

  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="/home" element={ token ? <Home /> : <Navigate to="/login" /> } />
    </Routes>
  );
};

export default App;
