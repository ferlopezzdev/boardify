import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

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
      const loginSuccess = await handleRegister(
        name,
        lastname,
        email,
        username,
        password
      );
      if (loginSuccess) {
        navigate("/home");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-md shadow-md max-w-lg w-full border-2 border-black"
        style={{ background: "linear-gradient(to bottom, #fff, #f1f1f1)" }}
      >
        <h1 className="mb-6 text-gray-700 text-2xl font-bold text-center">
          Regístrate
        </h1>
        <div className="flex">
          <div className="flex flex-col w-1/2 mr-2">
            <label className="mb-1 font-bold text-gray-700">Nombre</label>
            <input
              name="name"
              placeholder="Nombre"
              value={userData.name}
              onChange={handleChange}
              className="mb-4 p-2 text-[14px] border rounded border-black focus:outline-none focus:border-indigo-600"
              type="text"
              style={{ background: "rgba(255, 255, 255, 0.7)" }}
            />
          </div>
          <div className="flex flex-col w-1/2 ml-2">
            <label className="mb-1 font-bold text-gray-700">Apellido</label>
            <input
              name="lastname"
              placeholder="Apellido"
              value={userData.lastname}
              onChange={handleChange}
              className="mb-4 p-2 text-[14px] border rounded border-black focus:outline-none focus:border-indigo-600"
              type="text"
              style={{ background: "rgba(255, 255, 255, 0.7)" }}
            />
          </div>
        </div>
        <label className="mb-1 font-bold text-gray-700">Correo eléctronico</label>
        <input
          name="email"
          placeholder="Correo eléctronico"
          value={userData.email}
          onChange={handleChange}
          className="mb-4 p-2 text-[14px] border rounded border-black focus:outline-none focus:border-indigo-600"
          type="email"
          style={{ background: "rgba(255, 255, 255, 0.7)" }}
        />
        <label className="mb-1 font-bold text-gray-700">Usuario</label>
        <input
          name="username"
          placeholder="Usuario"
          value={userData.username}
          onChange={handleChange}
          className="mb-4 p-2 text-[14px] border rounded border-black focus:outline-none focus:border-indigo-600"
          type="text"
          style={{ background: "rgba(255, 255, 255, 0.7)" }}
        />
        <label className="mb-1 font-bold text-gray-700">Contraseña</label>
        <input
          name="password"
          placeholder="Contraseña"
          value={userData.password}
          onChange={handleChange}
          className="mb-4 p-2 text-[14px] border rounded border-black focus:outline-none focus:border-indigo-600"
          type="password"
          style={{ background: "rgba(255, 255, 255, 0.7)" }}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-800 font-bold transition-colors"
        >
          Register
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
      <p className="p-1">
        ¿Ya tienes una cuenta?,{" "}
        <Link
          to="/auth/signin"
          className=" text-indigo-600 font-bold uppercase border-b-2 border-indigo-600"
        >
          Ingresar
        </Link>
      </p>
    </div>
  );
  
};

export default Login;
