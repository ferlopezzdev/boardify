// Acceso del usuario
export const signin = async (username, password) => {
  const url = 'http://localhost:3000/auth/signin';

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Respuesta no válida del servidor");
  }

  const result = await response.json();
  return result;
};

// Registro de usuario
export const signup = async (name, lastname, email, username, password) => {
  const url = 'http://localhost:3000/auth/signup';

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, lastname, email, username, password }),
  });

  if (!response.ok) {
    throw new Error("Respuesta no válida del servidor");
  }

  const result = await response.json();
  return result;
};

// Función para validar que exista un token de inicio
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jswDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  }
  return false;
};