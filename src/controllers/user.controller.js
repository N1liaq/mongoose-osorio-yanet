import mongoose from "mongoose";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
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

    const userId = new mongoose.Types.ObjectId();
    const profileId = new mongoose.Types.ObjectId();

    await UserModel.create([
      {
        _id: userId,
        username,
        email,
        password,
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
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password")
      .populate("profile", "articles");

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
    const { id } = req.params;

    const user = await UserModel.findById(id)
      .select("-password")
      .populate("profile", "articles");

    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username },
      { returnDocument: "after" },
    ).select("-password");

    if (!updateUser) {
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
    const { id } = req.params;

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
