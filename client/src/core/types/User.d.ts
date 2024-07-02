// Contrato del usuario (formulario)
export interface User {
  user_id?: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Contrato de las credenciales del usuario
export interface UserCredentials {
  username: string;
  password: string;
}
