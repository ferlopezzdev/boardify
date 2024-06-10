import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { error, setError, loginService } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {
      await loginService(username, password);
    } else {
      setError("Completa todos los campos.")
    }

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded shadow-md max-w-xs w-full"
      >
        <label className="mb-1 text-gray-700">Username:</label>
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError('');
          }}
          className="mb-4 p-2 border rounded"
          type="text"
        />
        <label className="mb-1 text-gray-700">Password:</label>
        <input
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError('');
          }}
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

export default Register;
