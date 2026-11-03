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
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

articleSchema.virtual("tags", {
  ref: "ArticleTag",
  localField: "_id",
  foreignField: "article",
});
export const ArticleModel = model("Article", articleSchema);
