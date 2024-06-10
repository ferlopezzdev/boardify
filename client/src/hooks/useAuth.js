import { useState } from 'react';
import { apiAuthLogin } from '../api';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin  = async (username, password) => {
    try {
      // Obtener resultados de la Api de login
      const result = await apiAuthLogin(username, password);
      // Si se consigue el token exitosamente, autenticar usuario
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

  // Exportar posibles errores, autenticación y la función de logueo
  return { isAuthenticated, error, setError, handleLogin  };
};

export default useAuth;
