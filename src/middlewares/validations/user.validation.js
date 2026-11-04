import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("El username no debe ser vacío.")
    .isString()
    .withMessage("El username debe ser un texto.")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 a 20 caracteres.")
    .custom(async (username) => {
      const usernameExists = await UserModel.findOne({ username });
      if (usernameExists) {
        throw new Error("El username ingresado ya está en uso.");
      }
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email no debe ser vacío.")
    .isEmail()
    .withMessage("Debe ingresar un email válido.")
    .custom(async (email) => {
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        throw new Error("El email ingresado ya está en uso.");
      }

      const atIndex = email.indexOf("@");
      const localPart = email.slice(0, atIndex);
      if (localPart.includes("+") || localPart.includes(".")) {
        throw new Error("No se permiten puntos ni signo + antes del @.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La password no debe ser vacía.")
    .isString()
    .withMessage("La password debe ser un texto.")
    .isLength({ max: 100 })
    .withMessage("La password no debe pasar los 100 caracteres."),

  body("role")
    .optional()
    .trim()
    .toLowerCase()
    .custom((role) => {
      const validRoles = ["user", "admin"];
      if (!validRoles.includes(role)) {
        throw new Error(
          `El rol '${role}' no es válido. Los roles permitidos son "user" o "admin".`,
        );
      }
      return true;
    }),
];

export const updateUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del user no debe ser nulo.")
    .isMongoId()
    .withMessage("El ID debe ser un MongoID válido."),

  body("username")
    .optional()
    .isString()
    .withMessage("El username debe ser un texto.")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 a 20 caracteres.")
    .custom(async (username, { req }) => {
      const usernameExists = await UserModel.findOne({
        username,
        _id: { $ne: req.params.id },
      });
      if (usernameExists) {
        throw new Error(
          "El username ingresado ya está en uso por otro usuario.",
        );
      }
      return true;
    }),

  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Debe ingresar un email válido.")
    .custom(async (email, { req }) => {
      const emailExists = await UserModel.findOne({
        email,
        _id: { $ne: req.params.id },
      });
      if (emailExists) {
        throw new Error("El email ingresado ya está en uso por otro usuario.");
      }

      const atIndex = email.indexOf("@");
      const localPart = email.slice(0, atIndex);
      if (localPart.includes("+") || localPart.includes(".")) {
        throw new Error("No se permiten puntos ni signo + antes del @.");
      }
      return true;
    }),

  body("password")
    .optional()
    .isString()
    .withMessage("La password debe ser un texto.")
    .isLength({ max: 100 })
    .withMessage("La password no debe pasar los 100 caracteres."),

  body("role")
    .optional()
    .trim()
    .toLowerCase()
    .custom((role) => {
      const validRoles = ["user", "admin"];
      if (!validRoles.includes(role)) {
        throw new Error(
          `El rol '${role}' no es válido. Los roles permitidos son "user" o "admin".`,
        );
      }
      return true;
    }),
];

export const paramIDUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del user no debe ser nulo.")
    .isMongoId()
    .withMessage("El ID debe ser un MongoID válido."),
];
