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

export const userRouter = Router();

userRouter.get("/users", adminMiddleware, validate, getAllUsers);
userRouter.get(
  "/users/:id",
  adminMiddleware,
  paramIDUserValidation,
  validate,
  getUserById,
);
userRouter.put(
  "/users/:id",
  adminMiddleware,
  updateUserValidation,
  validate,
  updateUser,
);
userRouter.delete(
  "/users/:id",
  adminMiddleware,
  paramIDUserValidation,
  validate,
  deleteUser,
);
