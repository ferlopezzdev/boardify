import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserIdState] = useState(() => {
    // Inicializa el estado con el valor de localStorage si está disponible
    return localStorage.getItem("i") || "";
  });

  // Almacenar userId en el almacenamiento local al establecerlo
  const setUserId = (newUserId) => {
    localStorage.setItem("i", newUserId);
    setUserIdState(newUserId);
  };

  useEffect(() => {
    // Escuchar cambios en localStorage (en caso de que otro lugar de la aplicación lo modifique)
    const handleStorageChange = () => {
      const storedUserId = localStorage.getItem("i");
      if (storedUserId !== userId) {
        setUserIdState(storedUserId);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
