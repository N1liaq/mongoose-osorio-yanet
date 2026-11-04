import { model, Schema } from "mongoose";

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    versionKey: false,
  },
);

export const TagModel = model("Tag", tagSchema);
