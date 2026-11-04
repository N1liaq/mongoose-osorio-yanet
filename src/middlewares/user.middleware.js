import mongoose from "mongoose";
import { ArticleModel } from "../models/article.model.js";

export const userMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    if (role === "admin") return next();

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const article = await ArticleModel.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    if (!article.author.includes(userId)) {
      return res.status(403).json({ message: "Acceso denegado." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
