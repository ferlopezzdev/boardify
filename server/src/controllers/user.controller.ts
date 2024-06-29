import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import { User } from "../types/User";

const userController = {
  // Crear un nuevo usuario
  createUser: async (req: Request, res: Response) => {
    try {
      const user: User = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await userModel.getUserByCredentials(user.username, user.email);
      if (existingUser) {
        return res.status(400).json({ 
          error: {
            status: "ERROR",
            code: "USER_ALREADY_EXISTS",
            message: "El usuario ya existe.",
            details: "El nombre de usuario o el correo electrónico ya está en uso."
          } 
        });
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      // Crear usuario
      const newUser = await userModel.createUser(user);
      console.log(newUser);
      
      res.status(201).json({ 
        status: "OK",
        message: "Usuario creado exitosamente.",
        data: user 
      });
    } catch (error) {
      res.status(500).json({ error: "Error al crear usuario." });
    }
  },

  // Obtener un usuario por id
  getUserById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await userModel.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Usuario no encontrado." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener usuario" });
    }
  },

  // Obtener un usuario por nombre de usuario
  getUserByUsername: async (req: Request, res: Response) => {
    try {
      const username = req.params.username;
      const user = await userModel.getUserByUsername(username);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener usuario" });
    }
  },

  // Actualizar un usuario por id
  updateUser: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user: Partial<User> = req.body;
      await userModel.updateUser(id, user);
      res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar usuario" });
    }
  },

  // Eliminar un usuario por id
  deleteUser: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      await userModel.deleteUser(id);
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el usuario" });
    }
  }
};

export default userController;
