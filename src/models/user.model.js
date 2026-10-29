import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: [
      {
        _id: false,
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    profile: {
      type: Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    articles: [
      {
        type: Types.ObjectId,
        ref: "Article",
        required: true,
      },
    ],
  },

  {
    versionKey: false,
  },
);

export const UserModel = model("User", userSchema);
3;
