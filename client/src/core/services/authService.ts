import { User } from "../types/User";

interface UserCredentials {
  username: string;
  password: string;
}

interface NewUser extends User {
  confirmPassword: string;
}

const apiUrl = "http://localhost:3000";

const authService = {
  signup: async (user: NewUser): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || "Error desconocido";
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  signin: async (credentials: UserCredentials): Promise<any> => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || "Error desconocido";
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export default authService;
