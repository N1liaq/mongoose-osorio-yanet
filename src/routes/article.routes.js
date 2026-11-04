import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
} from "../controllers/article.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";
import {
  createArticleValidation,
  paramIDArticleValidation,
  updateArticleValidation,
} from "../middlewares/validations/article.validation.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const articleRouter = Router();

articleRouter.post(
  "/articles",
  authMiddleware,
  userMiddleware,
  createArticleValidation,
  validate,
  createArticle,
);
articleRouter.get("/articles", userMiddleware, validate, getAllArticle);
articleRouter.get(
  "/articles/:id",
  authMiddleware,
  userMiddleware,
  paramIDArticleValidation,
  validate,
  getArticleById,
);
articleRouter.put(
  "/articles/:id",
  authMiddleware,
  userMiddleware,
  updateArticleValidation,
  validate,
  updateArticle,
);
articleRouter.delete(
  "/articles/:id",
  authMiddleware,
  userMiddleware,
  paramIDArticleValidation,
  validate,
  deleteArticle,
);
