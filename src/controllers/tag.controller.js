import { populate } from "dotenv";
import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const newTag = await TagModel.create({ name });

    return res.status(201).json(newTag);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const getAllTag = async (req, res) => {
  try {
    const tags = await TagModel.find().populate({
      path: "articles",
      populate: {
        path: "article",
        select: "title description author",
        populate: { path: "author", select: "username" },
      },
    });

    return res.status(200).json({ data: tags });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await TagModel.findById(id).populate({
      path: "articles",
      populate: {
        path: "article",
        select: "title description author",
        populate: { path: "author", select: "username" },
      },
    });

    if (!tag) {
      return res.status(400).json({ msg: "Tag no encontrado." });
    }
    return res.status(200).json({ data: tag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedTag = await TagModel.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" },
    ).populate({
      path: "articles",
      populate: {
        path: "article",
        select: "title description author",
        populate: { path: "author", select: "username" },
      },
    });

    if (!updatedTag) {
      return res.status(404).json({ msg: "Tag no encontrado." });
    }

    return res.status(200).json({ data: updatedTag });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await TagModel.findById(id);

    if (!tag) {
      return res.status(400).json({
        msg: "Tag no encontrado.",
      });
    }

    await TagModel.deleteOne({ _id: id });
    res.status(200).json({ msg: "Tag eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};
