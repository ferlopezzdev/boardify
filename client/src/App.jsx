import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '@services/token.services';

import PageLogin from '@pages/Auth/PageLogin';
import PageRegister from '@pages/Auth/PageRegister';
import Home from '@pages/Home/Home';

const ProtectedRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<PageLogin />} />
      <Route path='/register' element={<PageRegister />} />
      {/* Rutas protegidas */}
      <Route path='/home' element={<ProtectedRoute element={<Home />} />} />
    </Routes>
  );
};

export default App;
