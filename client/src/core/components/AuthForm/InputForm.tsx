// InputField.tsx

import React, { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Permite que className sea opcional
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  name,
  placeholder,
  value,
  handleChange,
  className, // Recibe className como una prop opcional
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border-2 ${
          className || "" // Agregar className condicional si se proporciona
        } rounded-md shadow-sm focus:outline-none focus:border-primary sm:text-sm transition-colors`}
      />
    </div>
  );
};

export default InputField;
