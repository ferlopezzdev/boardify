import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { User } from "../types/User";
import dotenv from "dotenv";
dotenv.config();

const authController = {
  // Crear un nuevo usuario
  signupUser: async (req: Request, res: Response) => {
    try {
      const user: User = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await userModel.getUserByCredentials(
        user.username,
        user.email
      );
      if (existingUser) {
        return res.status(400).json({
          error: {
            status: "ERROR",
            code: "USER_ALREADY_EXISTS",
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
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60, // cookie por una hora
        })
        .json({
          status: "SUCCESS",
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
          status: "ERROR",
          code: "FATAL_ERROR",
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
            status: "ERROR",
            code: "USER_NOT_FOUND",
            message: "El usuario no existe.",
          },
        });
      }

      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          error: {
            status: "ERROR",
            code: "INVALID_CREDENTIALS",
            message: "Credenciales inválidas.",
          },
        });
      }

      // Crear y devolver el token JWT
      const token = jwt.sign(
        { id: user.user_id, username: user.username },
        process.env.TOKEN as string,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60, // cookie por una hora
        })
        .json({
          status: "SUCCESS",
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
          status: "ERROR",
          code: "INTERNAL_SERVER_ERROR",
          message: "Ocurrió un error al iniciar sesión.",
          details: error,
        },
      });
    }
  },
};

export default authController;
