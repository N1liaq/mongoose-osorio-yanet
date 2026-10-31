import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/profile/:id", getProfile);
authRouter.put("/profile/:id", updateProfile);
authRouter.post("/logout", logout);
