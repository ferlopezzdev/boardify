const connection = require("../models/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtoken = process.env.TOKEN;

// Login del usuario
module.exports.login = (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  try {
    // Conectar a la base de datos y consultar
    connection.query(query, [username, password], (err, result) => {
      // Validar errores
      if (err) {
        res.send(err);
      }

      // Si el usuario existe, generar token de ingreso
      if (result.length > 0) {
        const user = result[0];
        const token = jwt.sign(
          { id: user.id, username: user.username },
          jwtoken,
          {
            expiresIn: "365d",
          }
        );
        res.send({ token });
      } else {
        res.send({ message: "Usuario no existe." });
      }
    });
  } catch (error) {}
};