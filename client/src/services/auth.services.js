export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const tokenPayload = token.split('.')[1]; // Obtenemos la parte del payload del token
      const decoded = JSON.parse(atob(tokenPayload)); // Decodificamos la parte del payload
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false;
    }
  }
  return false;
};
