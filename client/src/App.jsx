import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "@components/utils/ProtectedRoute";
import Signin from "@pages/Auth/PageLogin";
import Signup from "@pages/Auth/PageRegister";
import Home from "@pages/Home/Home";
import useToken from '@hooks/useToken';

const App = () => {

  const isAutenticated = useToken();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute canActivate={isAutenticated} />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
