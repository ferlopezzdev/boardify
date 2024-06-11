import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token de autenticación del almacenamiento local
    localStorage.removeItem("token");
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow"
      onClick={handleLogout}
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
