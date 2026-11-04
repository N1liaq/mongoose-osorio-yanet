import { matchedData } from "express-validator";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password")
      .populate(["profile", "articles"]);

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const user = await UserModel.findById(id)
      .select("-password")
      .populate(["profile", "articles"]);

    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const { id, username } = validatedData;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username },
      { returnDocument: "after" },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }

    return res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }

    await ProfileModel.deleteOne({ _id: user.profile });
    await UserModel.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Usuario y perfil eliminados." });

    // const deleteUser = await UserModel.deleteOne({ _id: id });

    // return res.status(200).json({ data: deleteUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};
