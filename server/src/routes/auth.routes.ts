import express from "express";
import userController from "../controllers/auth.controller";

const router = express.Router();

// ENDPOINTS
router.post('/signin', userController.signinUser);
router.post('/signup', userController.signupUser);

export default router;
 