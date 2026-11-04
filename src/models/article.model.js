import { model, Schema, Types } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: [
      {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
      },
    ],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,

    versionKey: false,
  },
);

export const ArticleModel = model("Article", articleSchema);
