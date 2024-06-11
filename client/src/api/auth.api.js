// Función para validar token

export const login = async (username, password) => {
  const response = await fetch("http://localhost:3000/auth/login", {
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

export const register = async (name, lastname, email, username, password) => {
  const response = await fetch("http://localhost:3000/auth/register", {
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