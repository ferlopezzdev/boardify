import axios from 'axios';
import { User, UserCredentials } from "../types/User";

interface NewUser extends User {
  confirmPassword: string;
}

// URL base de las peticiones
const apiUrl = "http://localhost:3000";

const authService = {
  // Servicio para registrar usuario
  signup: async (user: NewUser): Promise<any> => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/signup`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Obtener el token de la respuesta y guardarlo en el localStorage
      const { token } = response.data.body;

      if (token) {
        localStorage.setItem('auth_access', token);
      }

      return response.data;

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error?.message || "Error desconocido";
        throw new Error(errorMessage);
      } else {
        throw new Error(error.message);
      }
    }
  },

  // Servicio para iniciar sesión
  signin: async (credentials: UserCredentials): Promise<any> => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/signin`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      return response.data;
      
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error?.message || "Error desconocido";
        throw new Error(errorMessage);
      } else {
        throw new Error(error.message);
      }
    }
  },
};

export default authService;
