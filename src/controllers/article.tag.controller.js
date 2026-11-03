import { ArticleTagModel } from "../models/article.tag.model.js";

export const createArticleTag = async (req, res) => {
  try {
    const { article, tag } = req.body;

    const relationExists = await ArticleTagModel.findOne({
      where: { article, tag },
    });

    if (relationExists) {
      return res.status(400).json("Ya existe un tag con ese article.");
    }

    const newRelation = await ArticleTagModel.create({ article, tag });

    return res.status(201).json({ data: newRelation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteArticleTag = async (req, res) => {
  try {
    const { id } = req.params;

    const ArticleTagDelete = await ArticleTagModel.findById(id);

    if (!ArticleTagDelete) {
      return res.status(400).json({
        message: "La relación entre el tag y article no encontrado.",
      });
    }

    await ArticleTagModel.findByIdAndDelete({ _id: id });

    res
      .status(200)
      .json({ message: "El tag fue eliminado correctamente del article." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
