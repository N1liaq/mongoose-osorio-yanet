import { body, param } from "express-validator";
import mongoose from "mongoose";
import { UserModel } from "../../models/user.model.js";
import { TagModel } from "../../models/tag.model.js";

export const createArticleValidation = [
  body("title")
    .notEmpty()
    .withMessage("El title no debe ser vacío.")
    .isString()
    .withMessage("El title debe ser un texto.")
    .isLength({ min: 3, max: 200 })
    .withMessage("El title debe tener entre 3 a 200 caracteres."),

  body("description")
    .notEmpty()
    .withMessage("La description no debe ser vacía.")
    .isString()
    .withMessage("La description debe ser un texto."),

  body("author")
    .notEmpty()
    .withMessage("El autor no debe ser vacío.")
    .isArray({ min: 1 })
    .withMessage("El autor debe ser un arreglo con al menos un ID.")
    .custom(async (authors) => {
      for (const id of authors) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error(`El ID de autor '${id}' no es un ObjectId válido.`);
        }
        const userExists = await UserModel.findById(id);
        if (!userExists) {
          throw new Error(`El usuario con ID '${id}' no existe.`);
        }
      }
      return true;
    }),

  body("tags")
    .optional()
    .isArray()
    .withMessage("El campo tags debe ser un arreglo de IDs.")
    .custom(async (tags) => {
      for (const id of tags) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error(`El ID de tag '${id}' no es un ObjectId válido.`);
        }
        const tagExists = await TagModel.findById(id);
        if (!tagExists) {
          throw new Error(`El tag con ID '${id}' no existe.`);
        }
      }
      return true;
    }),
];

export const updateArticleValidation = [
  ...paramIDArticleValidation,

  body("title")
    .optional()
    .isString()
    .withMessage("El title debe ser un texto.")
    .isLength({ min: 3, max: 200 })
    .withMessage("El title debe tener entre 3 a 200 caracteres."),

  body("description")
    .optional()
    .isString()
    .withMessage("La description debe ser un texto."),

  body("author")
    .optional()
    .isArray()
    .withMessage("El autor debe ser un arreglo de IDs.")
    .custom(async (authors) => {
      for (const id of authors) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error(`El ID de autor '${id}' no es un ObjectId válido.`);
        }
        const userExists = await UserModel.findById(id);
        if (!userExists) {
          throw new Error(`El usuario con ID '${id}' no existe.`);
        }
      }
      return true;
    }),

  body("tags")
    .optional()
    .isArray()
    .withMessage("El campo tags debe ser un arreglo de IDs.")
    .custom(async (tags) => {
      for (const id of tags) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error(`El ID de tag '${id}' no es un ObjectId válido.`);
        }
        const tagExists = await TagModel.findById(id);
        if (!tagExists) {
          throw new Error(`El tag con ID '${id}' no existe.`);
        }
      }
      return true;
    }),
];

export const paramIDArticleValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del article no debe estar vacío.")
    .isMongoId()
    .withMessage("El ID debe ser un MongoID válido."),
];
