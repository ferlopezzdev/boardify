import React, { useState } from "react";
import useAuth from "@hooks/useAuth";
import { Link, useNavigate  } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { error, setError, handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {
      const isLogin = await handleLogin(username, password);
      
      if ( isLogin ) {
        navigate("/home");
      }

    } else {
      setError("Completa todos los campos.")
    }

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-md shadow-md max-w-xs w-full border-2 border-black"
        style={{ background: 'linear-gradient(to bottom, #fff, #f1f1f1)' }}
      >
        <h1 className="mb-6 text-gray-700 text-2xl font-bold text-center">
          Iniciar sesión
        </h1>
        <label className="mb-1 font-bold text-gray-700 text-md">Usuario</label>
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError('');
          }}
          className="mb-4 p-2 text-[14px] border rounded border-black focus:outline-none focus:border-indigo-600"
          type="text"
          style={{ background: 'rgba(255, 255, 255, 0.7)' }}
        />
        <label className="mb-1 font-bold text-gray-700 text-md">Contraseña</label>
        <input
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError('');
          }}
          className="mb-4 p-2 text-[14px] border rounded border-black focus:outline-none focus:border-indigo-600"
          type="password"
          style={{ background: 'rgba(255, 255, 255, 0.7)' }}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-800 font-bold transition-colors"
        >
          Ingresar
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
      <p className="p-1">
        ¿Aún no tienes una cuenta?,{" "}
        <Link
          to="/auth/signup"
          className=" text-indigo-600 font-bold uppercase border-b-2 border-indigo-600"
        >
          Registrate
        </Link>
      </p>
    </div>
  );
  
}  

export default Login;
