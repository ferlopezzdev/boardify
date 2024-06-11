import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const { error, setError, handleRegister } = useAuth();
  const navigate = useNavigate();

  // Autorizar servicio de login al dar click
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el usuario y contraseña del formulario
    const { name, lastname, email, username, password } = userData;

    // Validar que los datos existan y sean correctos
    if (username && password) {
      const loginSuccess = await handleRegister(name, lastname, email, username, password);
      if (loginSuccess) {
        navigate("/dashboard");
      }
    } else {
      setError("Completa todos los campos.");
    }
  };

  // Establecer cambio de estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded shadow-md max-w-xs w-full"
      >
        <label className="mb-1 text-gray-700">Name:</label>
        <input
          name="name"
          placeholder="Nombre"
          value={userData.name}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          type="text"
        />
        <label className="mb-1 text-gray-700">Last name:</label>
        <input
          name="lastname"
          placeholder="Apellido"
          value={userData.lastname}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          type="text"
        />
        <label className="mb-1 text-gray-700">Email:</label>
        <input
          name="email"
          placeholder="Correo eléctronico"
          value={userData.email}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          type="email"
        />
        <label className="mb-1 text-gray-700">Username:</label>
        <input
          name="username"
          placeholder="Usuario"
          value={userData.username}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          type="text"
        />
        <label className="mb-1 text-gray-700">Password:</label>
        <input
          name="password"
          placeholder="Contraseña"
          value={userData.password}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          type="password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
