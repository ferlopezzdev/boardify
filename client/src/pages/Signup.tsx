import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAccusoft } from "react-icons/fa6";
import InputField from "../core/components/AuthForm/InputForm";
import { User } from "../core/types/User";
import { useAuth } from "../core/context/AuthContext";

const Signup: React.FC = () => {

  // Acceder al contexto de autorización
  const { signup } = useAuth();

  // Hook de redirección
  const navigate = useNavigate();

  // Establecer estado de los datos del usuario
  const [user, setUser] = useState<User>({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Establecer estado del error
  const [error, setError] = useState<string | null>(null);

  // Función para manejar cambios de estados de los inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Validar que las contraseñas coincidan
    if (name === "confirmPassword") {
      if (value === "") {
        setError(null); // Reiniciar error si el campo está vacío
      } else if (user.password !== value) {
        setError("Las contraseñas no coinciden.");
      } else {
        setError(null); // Reiniciar error si las contraseñas coinciden
      }
    }
  };

  const handleSubmit = async () => {
    // Validar antes de realizar la petición
    if (
      !user.name ||
      !user.lastname ||
      !user.username ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      
      // Realizar petición al servicio
      await signup(user);

      setUser({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

      setError(null);

      navigate('/home');
      
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="relative min-h-screen font-poppins bg-gray-100">
      <div className="absolute inset-0 bg-cover bg-center">
        <img
          src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/wac.92a80da2.svg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative animate-fade-right z-10 flex items-center justify-center min-h-screen">
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
            Rellena los campos para registrarte
          </h2>
          <form>
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/2 sm:mr-2">
                <InputField
                  label="Nombre"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ingrese su nombre"
                  value={user.name}
                  handleChange={handleInputChange}
                />
              </div>
              <div className="sm:w-1/2 sm:ml-2">
                <InputField
                  label="Apellido"
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Ingrese su apellido"
                  value={user.lastname}
                  handleChange={handleInputChange}
                />
              </div>
            </div>
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
              label="Correo electrónico"
              id="email"
              name="email"
              type="email"
              placeholder="Ej. usuario@correo.com"
              value={user.email}
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
            <InputField
              label="Confirmar contraseña"
              id="confirm-password"
              type="password"
              name="confirmPassword"
              placeholder="Repita su contraseña"
              value={user.confirmPassword}
              handleChange={handleInputChange}
              className={error ? "border-red-500" : ""}
            />
            <p className="text-center text-sm text-red-600 mb-2">
              {error}
            </p>
            <div className="flex items-center justify-center">
              <button
                className="w-full bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded focus:outline-none 
                focus:shadow-outline transition-colors"
                type="button"
                onClick={handleSubmit}
              >
                Crear cuenta
              </button>
            </div>
            
            <div className="flex flex-row justify-center items-center text-center mt-4 font-light text-sm">
              <p className="mx-1 border-b border-b-transparent">¿Ya tienes una cuenta?,</p>
              <Link 
              to="/auth/signin"
              className="text-primary border-b border-b-transparent hover:border-b-primary">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
