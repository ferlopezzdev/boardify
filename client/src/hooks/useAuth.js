import { useState } from "react";
import { login, register } from "../api";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (username, password) => {
    try {
      const result = await login(username, password);
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

  const handleRegister = async (name, lastname, email, username, password) => {
    try {
      const result = await register(name, lastname, email, username, password);
      if (result.token) {
        localStorage.setItem("token", result.token);
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Credenciales inválidas.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ocurrió un error al intentar registrar.");
    }
  };

  return { isAuthenticated, error, setError, handleLogin, handleRegister };
};

export default useAuth;
