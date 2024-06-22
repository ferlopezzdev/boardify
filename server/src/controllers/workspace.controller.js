const connection = require("../config/db.config");

module.exports.getAllWorkspaces = (req, res) => {
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
