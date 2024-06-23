import React from "react";
import Modal from "react-modal";

const CreateGroupModal = ({ isOpen, onRequestClose, onSave, title, setTitle, description, setDescription, placeholderTitle, placeholderDescription, modalTitle }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Crear Nuevo Grupo"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full font-poppins">
        <h2 className="font-semibold uppercase text-lg mb-4">{modalTitle}</h2>
        <label htmlFor="title" className="py-2">Título:</label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full px-2 py-1 border font-sans border-gray-300 rounded mb-4
          focus:border-primary focus:outline-none focus:placeholder:text-primary"
          placeholder={placeholderTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
         <label htmlFor="description" className="py-2">Descripción:</label>
        <textarea
          id="description"
          name="description"
          className="w-full px-2 py-1 font-sans border border-gray-300 rounded mb-4
          focus:border-primary focus:outline-none focus:placeholder:text-primary
          resize-vertical min-h-[100px] max-h-[500px]"
          placeholder={placeholderDescription}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
        />
        <div className="flex justify-end text-sm">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:opacity-75 transition-opacity"
            onClick={onRequestClose}
          >
            Cancelar
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded hover:opacity-75 transition-opacity"
            onClick={onSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;
