import React, { createContext, useContext, useState, ReactNode } from "react";
import authService from "../services/authService";
import { UserCredentials, User } from "../types/User";

interface NewUser extends User {
  confirmPassword: string;
}

// Define las propiedades del contexto de autenticación
interface AuthContextProps {
  token: string | null; // Token de autenticación actual
  signin: (credentials: UserCredentials) => Promise<void>; // Función para iniciar sesión
  signup: (user: NewUser) => Promise<void>; // Función para registrarse
  logout: () => void; // Función para cerrar sesión
}

// Crea el contexto de autenticación inicializado como indefinido
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Proveedor de contexto de autenticación para envolver la aplicación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado local para almacenar el token de autenticación
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_access")
  );

  // Función para iniciar sesión
  const signin = async (credentials: UserCredentials) => {
    try {
      const response = await authService.signin(credentials);

      // Si hay un token en la respuesta, actualiza el estado local y localStorage con el token
      if (response.body && response.body.token) {
        const token = response.body.token;
        localStorage.setItem("auth_access", token);
        setToken(token);
      } else {
        throw new Error("Credenciales inválidas");
      }

    } catch (error) {
      throw error;
    }
  };

  // Función para registrarse
  const signup = async (user: NewUser) => {
    try {
      const response = await authService.signup(user);
      const token = response.body.token;

      // Si hay un token en la respuesta, actualiza el estado local y localStorage con el token
      if (token) {
        localStorage.setItem("auth_access", token);
        setToken(token);
      }
    } catch (error) {
      console.error("Error al registrarse", error);
    }
  };

  // Función para cerrar sesión, limpia el token del localStorage y del estado local
  const logout = () => {
    localStorage.removeItem("auth_access");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext); // Obtiene el contexto de autenticación actual
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider"); // Lanza un error si el contexto es indefinido
  }
  return context;
};
