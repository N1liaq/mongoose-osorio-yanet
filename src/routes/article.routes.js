import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
} from "../controllers/article.controller.js";

export const articleRouter = Router();

articleRouter.post("/articles", createArticle);
articleRouter.get("/articles", getAllArticle);
articleRouter.get("/articles/:id", getArticleById);
articleRouter.put("/articles/:id", updateArticle);
articleRouter.delete("/articles/:id", deleteArticle);
