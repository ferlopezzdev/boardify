import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "@components/Utils/ProtectedRoute";
import Signin from "@pages/Auth/PageLogin";
import Signup from "@pages/Auth/PageRegister";
import Home from "@pages/Home/Home";
import useToken from '@hooks/useToken';

const App = () => {

  const isAutenticated = useToken();

  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute canActivate={isAutenticated} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Route>
      {/* Rutas de autorización */}
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
