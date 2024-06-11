import { useState } from "react";
import { login, register } from "../api"; // Importa las funciones de login y register desde un módulo api

// Custom hook para manejar la autenticación
const useAuth = () => {
  // Estados para manejar la autenticación y los errores
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado
  const [error, setError] = useState(""); // Estado para manejar errores

  // Función para manejar el inicio de sesión
  const handleLogin = async (username, password) => {
    try {
      // Realiza la solicitud de inicio de sesión
      const result = await login(username, password);
      // Verifica si se recibió un token en la respuesta
      if (result.token) {
        // Almacena el token en el almacenamiento local del navegador
        localStorage.setItem("token", result.token);
        // Actualiza el estado de autenticación a verdadero
        setIsAuthenticated(true);
        // Limpia cualquier error previo
        setError("");
      } else {
        // Establece un mensaje de error si las credenciales son inválidas
        setError("Credenciales inválidas.");
      }
    } catch (err) {
      // Registra cualquier error en la consola
      console.error("Login error:", err);
      // Establece un mensaje de error genérico
      setError("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  // Función para manejar el registro de usuarios
  const handleRegister = async (name, lastname, email, username, password) => {
    try {
      // Realiza la solicitud de registro
      const result = await register(name, lastname, email, username, password);
      // Verifica si se recibió un token en la respuesta
      if (result.token) {
        // Almacena el token en el almacenamiento local del navegador
        localStorage.setItem("token", result.token);
        // Actualiza el estado de autenticación a verdadero
        setIsAuthenticated(true);
        // Limpia cualquier error previo
        setError("");
      } else {
        // Establece un mensaje de error basado en la respuesta recibida
        setError(result.message);
      }
    } catch (err) {
      // Registra cualquier error en la consola
      console.error("Register error:", err);
      // Establece un mensaje de error genérico
      setError("Ocurrió un error al intentar registrar.");
    }
  };

  // Retorna las funciones y estados necesarios para manejar la autenticación
  return { isAuthenticated, error, setError, handleLogin, handleRegister };
};

export default useAuth; // Exporta el hook useAuth para ser utilizado en otros componentes
