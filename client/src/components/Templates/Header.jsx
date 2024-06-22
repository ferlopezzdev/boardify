import React, { useEffect, useState } from "react";
import { FaBars, FaHandsHoldingCircle } from "react-icons/fa6";
import { decodedToken } from "../../utils/token.utils";
import SearchBar from "../SearchBar/SearchBar";
import { FaUserLarge as Profile } from "react-icons/fa6";
import LogoutButton from "@components/Auth/LogoutButton";

const Header = () => {
  // Datos del usuario
  const [userData, setUserData] = useState({
    id: "",
    username: "",
  });

  useEffect(() => {
    // Obtener el payload decodificado del token
    const payloadDecoded = decodedToken();

    if (payloadDecoded && payloadDecoded.username) {
      // Establecer parametros al estado local
      setUserData({
        id: payloadDecoded.id,
        username: payloadDecoded.username,
      });
    }
  }, []);

  return (
    <header className="w-full border-b p-6 bg-gray-100 flex flex-row justify-between">
      <div className="flex flex-row">

        <div
          className="
        flex flex-row justify-center text-center items-center cursor-pointer mx-4
        tracking-wide text-gray-500 hover:text-primary transition-colors duration-200"
        >
          <FaHandsHoldingCircle color="#2BAEE5" size={30} />
          <h2 className="select-none font-poppins font-bold ml-1">Boardify</h2>
        </div>

        <div>
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-row">
        <div
          id="profile"
          title={"Usuario: " + userData.username}
          className="
      flex justify-center text-center items-center text-gray-500 hover:bg-white font-poppins mr-12 p-1 
      cursor-pointer rounded-xl transition-colors"
        >
          <Profile className="m-2" />
          <p>{userData.username}</p>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
