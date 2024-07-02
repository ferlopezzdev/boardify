import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define el tipo de datos para el contexto de búsqueda
interface SearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// Crea el contexto de búsqueda inicializado con un valor predeterminado
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Proveedor de contexto de búsqueda para envolver la aplicación
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de búsqueda
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch debe ser usado dentro de un SearchProvider');
  }
  return context;
};
