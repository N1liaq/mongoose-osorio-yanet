import { model, Schema, Types } from "mongoose";

const profileSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
    },
    avatar_url: {
      type: String,
    },
    birth_date: {
      type: Date,
      default: Date.now,
    },
    user: [
      {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
  },
);

export const ProfileModel = model("Profile", profileSchema);
