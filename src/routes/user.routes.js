import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.js";
import {
  paramIDUserValidation,
  updateUserValidation,
} from "../middlewares/validations/user.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  validate,
  getAllUsers,
);
userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  paramIDUserValidation,
  validate,
  getUserById,
);
userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidation,
  validate,
  updateUser,
);
userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  paramIDUserValidation,
  validate,
  deleteUser,
);
