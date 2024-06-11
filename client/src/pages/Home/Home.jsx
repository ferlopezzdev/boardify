import React, { useState, useEffect } from "react";
import { decodedToken } from "@services/auth.services";
import LogoutButton from "@components/Auth/LogoutButton";

const Home = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    // Obtener el payload decodificado del token
    const payloadDecoded = decodedToken();

    if (payloadDecoded && payloadDecoded.username) {
      // Establecer parametros al estado local
      setId(payloadDecoded.id);
      setUsername(payloadDecoded.username);
    }
  }, []);

  return (
    <div className="m-6">
      <h1>Bienvenido</h1>
      <p>user: {username}</p>
      <p>Id: {id} </p>
      <LogoutButton />
    </div>
  );
};

export default Home;
