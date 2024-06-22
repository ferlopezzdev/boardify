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
