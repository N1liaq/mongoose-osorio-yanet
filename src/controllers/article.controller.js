import { matchedData } from "express-validator";
import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";

export const createArticle = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const { author } = validatedData;

    const newArticle = await ArticleModel.create(validatedData);

    await UserModel.updateMany(
      { _id: { $in: author } },
      { $addToSet: { articles: newArticle._id } },
    );

    return res.status(201).json(newArticle);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const getAllArticle = async (req, res) => {
  try {
    const Articles = await ArticleModel.find().populate([
      { path: "tags", select: "name" },
      { path: "author", select: "username" },
    ]);

    return res.status(200).json({ data: Articles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;

    const Article = await ArticleModel.findById(id).populate([
      { path: "tags", select: "name" },
      { path: "author", select: "username" },
    ]);

    if (!Article) {
      return res.status(400).json({ msg: "Article no encontrado." });
    }
    return res.status(200).json({ data: Article });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const { id, ...data } = validatedData;

    const updatedArticle = await ArticleModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    }).populate([
      { path: "tags", select: "name" },
      { path: "author", select: "username" },
    ]);

    if (!updatedArticle) {
      return res.status(404).json({ msg: "Article no encontrado." });
    }

    return res.status(200).json({ data: updatedArticle });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const { id } = validatedData;

    const Article = await ArticleModel.findById(id);

    if (!Article) {
      return res.status(400).json({
        msg: "Article no encontrado.",
      });
    }

    await ArticleModel.deleteOne({ _id: id });
    res.status(200).json({ msg: "Article eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};
