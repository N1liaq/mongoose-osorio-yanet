import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El name no debe ser vacío.")
    .isString()
    .withMessage("El name debe ser un texto.")
    .isLength({ min: 2, max: 30 })
    .withMessage("El name debe tener entre 2 a 30 caracteres.")
    .custom(async (name) => {
      const tagExists = await TagModel.findOne({ name });
      if (tagExists) {
        throw new Error("El tag ingresado ya existe.");
      }
      return true;
    }),
];

export const updateTagValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del tag no debe ser nulo.")
    .isMongoId()
    .withMessage("El ID del tag debe ser un MongoID válido."),

  body("name")
    .optional()
    .trim()
    .isString()
    .withMessage("El name debe ser un texto.")
    .isLength({ min: 2, max: 30 })
    .withMessage("El name debe tener entre 2 a 30 caracteres.")
    .custom(async (name, { req }) => {
      const tagExists = await TagModel.findOne({
        name,
        _id: { $ne: req.params.id },
      });
      if (tagExists) {
        throw new Error("El name ingresado ya está en uso por otro tag.");
      }
      return true;
    }),
];

export const paramIDTagValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del tag no debe ser nulo.")
    .isMongoId()
    .withMessage("El ID del tag debe ser un MongoID válido."),
];
