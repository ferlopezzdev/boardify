// Función para verificar si el token es valido
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

// Función para decodificar un token para acceder a sus parametros
export const decodedToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    // Separar las partes del token (encabezado, payload y firma)
    const [headerEncoded, payloadEncoded] = token.split(".");

    // Decodificar el payload (parte codificada en Base64) utilizando atob()
    const payloadDecoded = JSON.parse(atob(payloadEncoded));

    // Retornar el payload decodificado
    return payloadDecoded;
  }

  // Retornar null si no hay token
  return null;
};
