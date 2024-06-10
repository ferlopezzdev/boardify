import { useState } from 'react';
import { authLogin } from '../api';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const loginService = async (username, password) => {
    try {
      const result = await authLogin(username, password);
      if (result.token) {
        localStorage.setItem("token", result.token);
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Credenciales inválidas.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  return { isAuthenticated, error, setError, loginService };
};

export default useAuth;
