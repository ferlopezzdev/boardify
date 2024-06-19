import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./ModalLogout"; // Asume que ya tienes un componente de Modal

const LogoutButton = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Eliminar el token de autenticación del almacenamiento local
    localStorage.removeItem("token");
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/auth/signin");
  };

  const confirmLogout = () => {
    setShowModal(true);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  const logoutAndCloseModal = () => {
    handleLogout();
    setShowModal(false);
  };

  return (
    <>
      <button
        className="text-red-500 font-poppins text-sm"
        onClick={confirmLogout}
      >
        Cerrar sesión
      </button>
      {showModal && (
        <Modal
          title="Cerrar sesión"
          onClose={cancelLogout}
          onSubmit={logoutAndCloseModal}
        >
          <p>¿Está seguro de que desea cerrar la sesión?</p>
          <div className="flex justify-end mt-4">
            <button onClick={logoutAndCloseModal}></button>
            <button onClick={cancelLogout}></button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LogoutButton;
