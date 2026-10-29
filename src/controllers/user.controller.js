import mongoose from "mongoose";
import { ProfileModel } from "../models/profile.model";
import { UserModel } from "../models/user.model";

export const createUser = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    const {
      username,
      email,
      password,
      adresses,
      role,
      profile,
      articles,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
      user,
    } = req.body;

    const userId = new mongoose.Types.ObjectId();
    const profileId = new mongoose.Types.ObjectId();

    await session.withTransaction(async () => {
      const [newUser] = await UserModel.create(
        [
          {
            _id: userId,
            username,
            email,
            password,
            adresses,
            role,
            articles,
            profile: profileId,
          },
        ],
        { session },
      );

      const [newProfile] = await ProfileModel.create(
        [
          {
            _id: profileId,
            first_name,
            last_name,
            biography,
            avatar_url,
            birth_date,
            user: userId,
          },
        ],
        { session },
      );
    });

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

    const users = await UserModel.findById(id)
      .select("-password")
      .populate("profile", "articles");

    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};
