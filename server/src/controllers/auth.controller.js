const connection = require("../models/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtoken = process.env.TOKEN;

module.exports.login = (req, res) => {
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
            { id: user.id, username: user.username },
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
module.exports.register = async (req, res) => {
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

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar el nuevo usuario en la base de datos
      const insertQuery = "INSERT INTO users (name, lastname, email, username, password, creation) VALUES (?, ?, ?, ?, ?, NOW())";
      connection.query(insertQuery, [name, lastname, email, username, hashedPassword], (err, result) => {
        if (err) {
          return res.send(err);
        }

        // Generar token de ingreso
        const token = jwt.sign(
          { id: result.insertId, username: username },
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