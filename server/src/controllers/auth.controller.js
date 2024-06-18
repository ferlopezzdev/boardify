const connection = require("../config/db.config");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { generateUniqueId } = require('../utils/common.utils');
const config = require('../config/data.config');

const jwtoken = config.token;

module.exports.signin = (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";

  try {
    // Conectar a la base de datos y consultar
    connection.query(query, [username], async (err, result) => {
      // Validar errores
      if (err) {
        return res.status(500).send(err);
      }

      // Si el usuario existe
      if (result.length > 0) {
        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          // Generar token de ingreso
          const token = jwt.sign(
            { id: user.unique_id, username: user.username },
            jwtoken,
            {
              expiresIn: "365d",
            }
          );
          return res.send({ token });
        } else {
          // Contraseña incorrecta
          return res.send({ message: "Contraseña incorrecta." });
        }
      } else {
        // Usuario no existe
        return res.send({ message: "Usuario no existe." });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Ocurrió un error al intentar iniciar sesión." });
  }
};

// Registro de usuario
module.exports.signup = async (req, res) => {
  const { name, lastname, email, username, password } = req.body;

  // Verificar que todos los campos estén completos
  if (!name || !lastname || !email || !username || !password) {
    return res.send({ message: "Completa todos los campos." });
  }

  try {
    // Verificar si el usuario ya existe
    const userCheckQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
    connection.query(userCheckQuery, [username, email], async (err, result) => {
      if (err) {
        return res.send(err);
      }

      if (result.length > 0) {
        return res.send({ message: "El usuario o correo ya existe." });
      }

      // Generar id único
      const unique_id = generateUniqueId(20);

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Estado del usuario
      const status = 'active';

      // Insertar el nuevo usuario en la base de datos
      const insertQuery = "INSERT INTO users (unique_id, name, lastname, username, email, password, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
      connection.query(insertQuery, [unique_id, name, lastname, username, email, hashedPassword, status], (err, result) => {
        if (err) {
          return res.send(err);
        }

        const token = jwt.sign(
          { id: unique_id, username: username },
          jwtoken,
          {
            expiresIn: "365d",
          }
        );
        res.send({ token });
      });
    });
  } catch (error) {
    res.send({ message: "Ocurrió un error al registrar el usuario." });
  }
};