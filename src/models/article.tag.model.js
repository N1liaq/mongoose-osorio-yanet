import { model, Schema } from "mongoose";

const articleTagSchema = new Schema(
  {
    article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
    tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
    assignedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
  },
);

articleTagSchema.index({ article: 1, tag: 1 }, { unique: true });

export const ArticleTagModel = model("ArticleTag", articleTagSchema);
