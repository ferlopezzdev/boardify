import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

// ENDPOINTS
// Ruta para crear un nuevo usuario
router.post("/create", userController.createUser);

// Ruta para obtener un usuario por id
router.get("/get/:id", userController.getUserById);

// Ruta para obtener un usuario por nombre de usuario
router.get("/get/:username", userController.getUserByUsername);

// Ruta para actualizar un usuario por id
router.put("/update/:id", userController.updateUser);

// Ruta para eliminar un usuario por id
router.delete("/delete/:id", userController.deleteUser);

export default router;
 