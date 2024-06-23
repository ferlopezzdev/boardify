// Obtener todos los grupos de trabajo
export const getAllWorkspace = async (id) => {
    const url = `http://localhost:3000/workspace/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Respuesta no válida del servidor");
    }

    const result = await response.json();
    return result;
};

// Añadir un grupo de trabajo
export const addWorkspace = async (title, description, user_id) => {
  const url = `http://localhost:3000/workspace/create`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, user_id }),
  });

  if (!response.ok) {
    throw new Error("Respuesta no válida del servidor");
  }

  const result = await response.json();
  return result;
};

// En tu servicio workspaces.services.js

export const deleteWorkspace = async (id) => {
  const url = `http://localhost:3000/workspace/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Respuesta no válida del servidor");
  }

  const result = await response.json();
  return result;
};

// Actualizar un grupo de trabajo
export const updateWorkspace = async (group_id, title, description) => {
  const url = `http://localhost:3000/workspace/${group_id}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    throw new Error("Respuesta no válida del servidor");
  }

  const result = await response.json();
  return result;
};
