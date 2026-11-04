import { body } from "express-validator";

export const loginValidator = [
  body("username")
    .notEmpty()
    .withMessage("El username no debe ser vacío.")
    .isString()
    .withMessage("El username debe ser un texto.")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 a 20 caracteres."),

  body("password")
    .notEmpty()
    .withMessage("La password no debe ser vacía.")
    .isString()
    .withMessage("La password debe ser un texto.")
    .isLength({ max: 100 })
    .withMessage("La password no debe pasar los 100 caracteres."),
];
