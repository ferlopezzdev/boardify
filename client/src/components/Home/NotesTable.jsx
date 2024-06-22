import React, { useEffect, useState } from "react";
import { getAllWorkspace } from "../../services/workspaces.services"; // Asegúrate de importar correctamente la función getAllWorkspace
import { useUser } from "../../context/UserContext";

const NotesTable = () => {
  const [notes, setNotes] = useState([]);

  const { userId } = useUser();

  console.log(userId);

  useEffect(() => {

    const fetchNotes = async () => {
      try {
        const result = await getAllWorkspace(userId);
        setNotes(result);
      } catch (error) {
        console.error("Error al obtener las notas:", error);
      }
    };

    fetchNotes();
  }, [userId]);

  const handleDelete = (id) => {
    // Implementa la lógica para eliminar la nota con el ID proporcionado
    console.log(`Eliminar nota con ID: ${id}`);
  };

  const handleUpdate = (id) => {
    // Implementa la lógica para actualizar la nota con el ID proporcionado
    console.log(`Actualizar nota con ID: ${id}`);
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{note.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{note.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{note.created}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{note.updated}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="mr-2 bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(note.id)}>Eliminar</button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleUpdate(note.id)}>Actualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotesTable;
