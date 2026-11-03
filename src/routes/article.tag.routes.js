import { Router } from "express";
import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/article.tag.controller.js";

export const articleTagRouter = Router();

articleTagRouter.post("/articlesTags", createArticleTag);
articleTagRouter.delete("/articlesTags/:id", deleteArticleTag);
