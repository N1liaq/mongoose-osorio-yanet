import mongoose from "mongoose";
import { matchedData } from "express-validator";
import { comparePassword, hashPassword } from "../helpers/bcript.helper.js";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";
import { signToken } from "../helpers/jwt.helper.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await UserModel.findOne({ username });

    if (!userExist) {
      return res.status(401).json({
        msg: "Credenciales incorrectas",
      });
    }

    const validPassword = await comparePassword(password, userExist.password);

    if (!validPassword) {
      return res.status(401).json({
        msg: "Credenciales incorrectas",
      });
    }

    // const token = generateToken({ idUser: userExist.id });

    const token = signToken({ user: userExist.id, role: userExist.role });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "Usuario logueado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await ProfileModel.findById(id);

    if (!profile) {
      return res
        .status(404)
        .json({ msg: "¡El profile que está buscando no fue encontrado!" });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { first_name, last_name, biography, avatar_url, birth_date } =
      req.body;
    const { id } = req.params;

    const Updatedprofile = await ProfileModel.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        biography,
        avatar_url,
        birth_date,
      },
      { returnDocument: "after" },
    );

    if (!Updatedprofile) {
      return res.status(400).json({
        msg: "El profile que esta buscando no fue encontrado.",
      });
    }

    return res.status(200).json({ data: Updatedprofile });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      addresses,
      role,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    } = req.body;

    const hashedPassword = await hashPassword(password);

    const userId = new mongoose.Types.ObjectId();
    const profileId = new mongoose.Types.ObjectId();

    await UserModel.create([
      {
        _id: userId,
        username,
        email,
        password: hashedPassword,
        addresses,
        role,
        profile: profileId,
      },
    ]);

    try {
      await ProfileModel.create([
        {
          _id: profileId,
          first_name,
          last_name,
          biography,
          avatar_url,
          birth_date,
          user: userId,
        },
      ]);
    } catch (error) {
      await UserModel.deleteOne({ _id: userId });
      throw error;
    }

    const createdUser = await UserModel.findById(userId)
      .select("-password")
      .populate("profile");

    return res.status(201).json({ data: createdUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "se cerró la sesión correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
