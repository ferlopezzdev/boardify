// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { decodedToken } from '@utils/token.utils';

const useToken = () => {

  // Verificar si el token existe inicialmente
  const tokenExists = localStorage.getItem('token') ? true : false;

  // Autenticar si existe el token
  const [isAuthenticated, setIsAuthenticated] = useState(tokenExists);

  useEffect(() => {
    // Decodificar el token y validar que sea uno válido
    const payloadDecoded = decodedToken();
    if (payloadDecoded && payloadDecoded.username) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};

export default useToken;
