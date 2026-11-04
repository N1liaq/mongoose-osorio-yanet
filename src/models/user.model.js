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

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },

  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual("articles", {
  ref: "Article", // Modelo donde buscar
  localField: "_id", // _id del usuario
  foreignField: "author", // Campo en Article que hace referencia al usuario
});

export const UserModel = model("User", userSchema);
3;
