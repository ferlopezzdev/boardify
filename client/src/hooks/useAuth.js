import { useState } from "react";
import { signin, signup } from "@services"; // Importa las funciones de login y register desde un módulo api

// Custom hook para manejar la autenticación
const useAuth = () => {
  // Estados para manejar la autenticación y los errores
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado
  const [error, setError] = useState(""); // Estado para manejar errores

  // Función para manejar el inicio de sesión
  const handleLogin = async (username, password) => {
    try {
      const result = await signin(username, password);
      // Verifica si se recibió un token en la respuesta
      if (result.token) {
        // Almacena el token en el almacenamiento local del navegador
        localStorage.setItem("token", result.token);
        setIsAuthenticated(true);
        setError("");
        // Autorizar inicio de sesión
        return true;
      } else {
        setError(result.message);
        // Rechazar inicio de sesión
        return false;
      }
    } catch (err) {
      // Establece un mensaje de error genérico
      setError("Ocurrió un error al intentar iniciar sesión.");
      return false;
    }
  };

  // Función para manejar el registro de usuarios
  const handleRegister = async (name, lastname, email, username, password) => {
    try {
      const result = await signup(name, lastname, email, username, password);
      // Verifica si se recibió un token en la respuesta
      if (result.token) {
        // Almacena el token en el almacenamiento local del navegador
        localStorage.setItem("token", result.token);
        setIsAuthenticated(true);
        setError("");
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err) {
      // Establece un mensaje de error genérico
      setError("Ocurrió un error al intentar registrar.");
    }
  };

  // Retorna las funciones y estados necesarios para manejar la autenticación
  return { isAuthenticated, error, setError, handleLogin, handleRegister };
};

export default useAuth;
