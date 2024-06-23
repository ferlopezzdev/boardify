const connection = require("../config/db.config");

module.exports.getAllWorkspaces = async (req, res) => {
  const query = "SELECT * FROM group_notes WHERE id_user = ?";

  try {
    connection.query(query, [req.params.id], async (err, result) => {
      // Validar errores
      if (err) {
        return res.status(500).send(err);
      }

      // Enviar todas las respuestas como JSON
      res.json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};

module.exports.addWorkspace = async (req, res) => {
  const { title, description, user_id } = req.body;
  const query =
    "INSERT INTO group_notes (title, description, id_user) VALUES (?, ?, ?)";

  try {
    connection.query(
      query,
      [title, description, user_id],
      async (err, result) => {
        // Validar errores
        if (err) {
          return res.status(500).send(err);
        }
        
        res.json("status: Creado correctamente")
      }
    );
  } catch (error) {
    res.status(500).send("Error al crear grupo");
  }
};

module.exports.deleteWorkspace = async (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM group_notes WHERE group_id = ?";

  try {
    connection.query(query, [id], async (err, result) => {
      // Validar errores
      if (err) {
        return res.status(500).send(err);
      }

      // Verificar si se eliminó algún grupo de trabajo
      if (result.affectedRows === 0) {
        return res.status(404).send("No se encontró el grupo de trabajo con el ID dado");
      }

      res.json("Grupo de trabajo eliminado correctamente");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar grupo de trabajo");
  }
};

module.exports.updateWorkspace = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const query = "UPDATE group_notes SET title = ?, description = ? WHERE group_id = ?";

  try {
    connection.query(query, [title, description, id], async (err, result) => {
      // Validar errores
      if (err) {
        return res.status(500).send(err);
      }

      // Verificar si se actualizó algún grupo de trabajo
      if (result.affectedRows === 0) {
        return res.status(404).send("No se encontró el grupo de trabajo con el ID dado");
      }

      res.json("Grupo de trabajo actualizado correctamente");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar grupo de trabajo");
  }
};
