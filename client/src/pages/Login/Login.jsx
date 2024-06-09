import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor ingrese un usuario y contraseña.");
      return;
    }

    const data = { username, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Respuesta no válida del servidor");
      }

      const result = await response.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate('/home'); // Redirige a la página de inicio
      } else {
        setError("Credenciales inválidas.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ocurrió un error al intentar iniciar sesión.");
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // Redirige a la página de inicio si está autenticado
    }
  }, [isAuthenticated, navigate]);

  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleLogin}
            className="flex flex-col bg-white p-6 rounded shadow-md max-w-xs w-full"
          >
            <label className="mb-1 text-gray-700">Username:</label>
            <input
              placeholder="Usuario"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className="mb-4 p-2 border rounded"
              type="text"
            />

            <label className="mb-1 text-gray-700">Password:</label>
            <input
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="mb-4 p-2 border rounded"
              type="password"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
  );
};

export default Login;
