import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/user.model";
import { User } from "../types/User";
import dotenv from "dotenv";
dotenv.config();

const authController = {
  // Crear un nuevo usuario
  signupUser: async (req: Request, res: Response) => {
    try {
      const user: User = req.body;

      // Sanitizar puntos de entrada
      user.status = "conectado";
      user.username = validator.trim(user.username).toLocaleLowerCase();
      user.email = validator.trim(user.email).toLocaleLowerCase();

      // Validar puntos de entrada
      // Si el formato del correo es válido
      if (!validator.isEmail(user.email)) {
        return res.status(400).json({
          error: {
            status: "Error",
            message: "Formato de correo no válido.",
            details: "No es un correo válido.",
          },
        });
      }

      // Si el nombre de usuario es lo suficientemente largo
      if (!validator.isLength(user.username, { min: 4, max: 30 })) {
        return res.status(400).json({
          error: {
            status: "Error",
            message: "Nombre de usuario muy corto",
            details: "El nombre de usuario debe tener al menos 4 caracteres",
          },
        });
      }

      // Si el nombre de usuario es alphanúmerico
      if (!validator.isAlphanumeric(user.username)) {
        return res.status(400).json({
          error: {
            status: "Error",
            message: "Nombre de usuario inválido.",
            details: "El nombre de usuario no puede ser alfanúmerico.",
          },
        });
      }

      // Válidar longitud de la contraseña
      if (!validator.isLength(user.password, { min: 8 })) {
        return res.status(400).json({
          error: {
            status: "Error",
            message: "Contraseña no válida.",
            details: "La contraseña debe contener al menos 8 caracteres.",
          },
        });
      }

      // Verificar si el usuario ya existe
      const existingUser = await userModel.getUserByCredentials(
        user.username,
        user.email
      );
      if (existingUser) {
        return res.status(400).json({
          error: {
            status: "Error",
            message: "El usuario ya existe.",
            details:
              "El nombre de usuario o el correo electrónico ya está en uso.",
          },
        });
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      // Crear usuario
      const newUser = await userModel.createUser(user);
      console.log(newUser);

      // Crear y devolver el token JWT
      const token = jwt.sign(
        { id: user.user_id, username: user.username },
        process.env.TOKEN as string,
        { expiresIn: "24h" }
      );

      // Enviar respuesta
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60, // cookie por una hora
        })
        .json({
          status: "Success",
          data: {
            token: token,
            user: {
              id: user.user_id,
              username: user.username,
              email: user.email,
            },
          },
        });
    } catch (error) {
      res.status(500).json({
        error: {
          status: "Error",
          message: "Error interno del servidor.",
          details: "No se pudo crear el usuario.",
        },
      });
    }
  },

  // Iniciar sesión
  signinUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      // Verificar si el usuario existe
      const user = await userModel.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({
          error: {
            status: "Error",
            message: "El usuario no existe.",
          },
        });
      }

      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          error: {
            status: "Error",
            message: "Credenciales inválidas.",
          },
        });
      }

      // Crear y devolver el token JWT
      const token = jwt.sign(
        { id: user.user_id, username: user.username },
        process.env.TOKEN as string,
        { expiresIn: "24h" }
      );

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60, // cookie por una hora
        })
        .json({
          status: "Success",
          data: {
            token: token,
            user: {
              id: user.user_id,
              username: user.username,
              email: user.email,
            },
          },
        });
    } catch (error) {
      res.status(500).json({
        error: {
          status: "Error",
          message: "Ocurrió un error al iniciar sesión.",
          details: error,
        },
      });
    }
  },
};

export default authController;
