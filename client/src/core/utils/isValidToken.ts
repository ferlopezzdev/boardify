// utils/decodeJwt.ts

interface DecodedToken {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

const decodeJwt = (token: string): any => {
  const parts = token.split('.');
  
  if (parts.length !== 3) {
    console.error('Token JWT inválido: no tiene el formato esperado');
    return null;
  }
  
  const decodedBody = JSON.parse(atob(parts[1]));
  
  // Verificar si el token ha expirado
  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedBody.exp && decodedBody.exp < currentTime) {
    console.error('El token JWT ha expirado');
    return null;
  }
  
  // Establecer cuerpo del token decodificado
  const decodedToken: DecodedToken = {
    id: decodedBody.id,
    username: decodedBody.username,
    iat: decodedBody.iat,
    exp: decodedBody.exp,
  };
  
  return decodedToken;
};

export default decodeJwt;
