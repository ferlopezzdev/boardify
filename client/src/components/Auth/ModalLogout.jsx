import React from "react";

const Modal = ({ title, onClose, onSubmit, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-poppins"
    onClick={onClose}>
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="text-gray-500 hover:text-gray-700 px-2 hover:bg-gray-200 rounded-full" 
          onClick={onClose}>
            X
          </button>
        </div>
        <div>{children}</div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onSubmit}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
