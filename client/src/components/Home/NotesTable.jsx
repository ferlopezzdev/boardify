import React, { useState, useEffect } from "react";
import {
  addWorkspace,
  getAllWorkspace,
  deleteWorkspace,
  updateWorkspace,
} from "@services/workspaces.services";
import { useUser } from "../../context/UserContext";
import CreateGroupModal from "./Modals/CreateGroupModal";

const NotesTable = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { userId } = useUser();

  const fetchNotes = async () => {
    try {
      const result = await getAllWorkspace(userId);
      if (Array.isArray(result)) {
        const formattedNotes = result.map((note) => ({
          ...note,
          created_at: new Date(note.created_at).toLocaleString(),
          updated_at: new Date(note.updated_at).toLocaleString(),
        }));
        setNotes(formattedNotes);
      } else {
        console.error("Error: No obtuvimos datos");
      }
    } catch (error) {
      console.error("Error al obtener las notas:", error);
    }
  };
  

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = () => {
    setTitle("");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleDelete = async (group_id) => {
    try {
      const confirmDelete = window.confirm(
        "¿Estás seguro de que quieres eliminar este grupo de trabajo?"
      );
      if (confirmDelete) {
        await deleteWorkspace(group_id);
        fetchNotes();
      }
    } catch (error) {
      console.error("Error al eliminar el grupo de trabajo:", error);
    }
  };

  const handleUpdate = (group_id) => {
    const selected = notes.find((note) => note.group_id === group_id);
    setSelectedNote(selected);
    setTitle(title);
    setDescription(description);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (selectedNote) {
        await updateWorkspace(selectedNote.group_id, title, description);
      } else {
        await addWorkspace(title, description, userId);
      }
      setTitle("");
      setDescription("");
      setSelectedNote(null);
      setIsModalOpen(false);
      fetchNotes();
    } catch (error) {
      console.error("Error al guardar el grupo:", error);
    }
  };

  return (
    <div className="w-full overflow-x-auto font-poppins mx-6">
      <table className="min-w-full divide-y divide-gray-200 mx-4 my-2">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Titulo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Creado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actualizado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y p-0 m-0 divide-gray-200">
          {notes.map((note) => (
            <tr key={note.group_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {note.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {note.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {note.created_at}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {note.updated_at}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  className="mr-2 bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(note.group_id)}
                >
                  Eliminar
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleUpdate(note.group_id)}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-primary text-white text-sm px-2 py-1 m-6 rounded-sm fixed bottom-4 right-4"
        onClick={handleCreate}
      >
        + Agregar grupo
      </button>
      <CreateGroupModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        modalTitle={selectedNote ? `Actualizar grupo: ${selectedNote.title}` : 'Agregar nuevo grupo'}
        onSave={handleSave}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        placeholderTitle={selectedNote ? selectedNote.title : 'Titulo del grupo'}
        placeholderDescription={selectedNote ? selectedNote.description : 'Describa brevemente...'}
      />
    </div>
  );
};

export default NotesTable;
