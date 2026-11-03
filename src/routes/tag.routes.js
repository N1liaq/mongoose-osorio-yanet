import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTag,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";

export const tagRouter = Router();

tagRouter.post("/tags", createTag);
tagRouter.get("/tags", getAllTag);
tagRouter.get("/tags/:id", getTagById);
tagRouter.put("/tags/:id", updateTag);
tagRouter.delete("/tags/:id", deleteTag);
