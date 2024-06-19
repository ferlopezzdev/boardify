import React, { useState, useEffect } from "react";
import { decodedToken } from "@utils/token.utils";
import Header from "../../components/Templates/Header";

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
    <>
      <Header />
      <div className="m-6">
        <h1>Bienvenido</h1>
        <p>user: {username}</p>
        <p>Id: {id} </p>
      </div>
    </>
  );
};

export default Home;
