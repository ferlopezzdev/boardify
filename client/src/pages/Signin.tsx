import React, { useState, ChangeEvent } from "react";
import { FaAccusoft } from "react-icons/fa6";
import InputField from "../core/components/AuthForm/InputForm";
import { Link } from "react-router-dom";
import { UserCredentials } from "../core/types/User";
import { useAuth } from "../core/context/AuthContext";

const Login: React.FC = () => {

  const { login } = useAuth();

  // Establecer estado de las credenciales
  const [user, setUser] = useState<UserCredentials>({
    username: "",
    password: "",
  });

  // Estado de los errores
  const [error, setError] = useState<string | null>(null);

  // Función para validar los cambios de estado
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

// Función para enviar datos del formulario
const handleSubmit = async () => {
  // Validar campos antes de enviar los datos
  if (!user.username || !user.password) {
    setError("Todos los campos son obligatorios.");
    return;
  }

  try {
    // Realizar petición al servicio
    await login(user);

     // Limpiar campos después de iniciar sesión exitosamente
     setUser({
      username: "",
      password: "",
    });

    setError(null);

  } catch (error: any) {
    setError(error.message);
  }
};

  return (
    <div className="relative min-h-screen font-poppins bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center">
        <img
          src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/wac.92a80da2.svg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative animate-fade-left z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-8 bg-white shadow-2xl rounded-lg mx-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-24 bg-primaryLight rounded-full transform rotate-45 origin-top-left"></div>
          <div className="absolute top-0 right-0 w-20 h-24 bg-primaryLight rounded-full transform -rotate-45 origin-top-right"></div>

          <div className="flex flex-row justify-center">
            <FaAccusoft size={36} className="text-primary mx-2" />
            <h1 className="text-3xl text-center font-semibold uppercase mb-2 text-primary">
              Boardify
            </h1>
          </div>
          <h2 className="text-center mb-6 text-gray-500">
            Inicia sesión con tu cuenta
          </h2>
          <form>
            <InputField
              label="Nombre de usuario"
              id="username"
              name="username"
              type="text"
              placeholder="Ingrese su nombre de usuario"
              value={user.username}
              handleChange={handleInputChange}
            />
            <InputField
              label="Contraseña"
              id="password"
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={user.password}
              handleChange={handleInputChange}
            />
            <div className="flex flex-row justify-end my-4">
            <Link
              to="/auth/change-password"
              className="text-primary font-light hover:tracking-tight hover:font-semibold rounded transition-all">
              Olvidé mi contraseña
            </Link>
            </div>
            <p
              className={`text-center text-sm text-red-600 mb-2 ${
                error ? "block" : "hidden"
              }`}
            >
              {error || ""}
            </p>
            <div className="flex items-center justify-center">
              <button
                className="w-full bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded focus:outline-none 
                focus:shadow-outline transition-colors"
                type="button"
                onClick={handleSubmit}
              >
                Iniciar sesión
              </button>
            </div>
            <div className="flex flex-row justify-center items-center text-center mt-4 font-light text-sm">
              <p className="mx-1 border-b border-b-transparent">¿Aún no tienes una cuenta?,</p>
              <Link
                to="/auth/signup"
                className="text-primary border-b border-b-transparent hover:border-b-primary"
              >
                Registrarme
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
