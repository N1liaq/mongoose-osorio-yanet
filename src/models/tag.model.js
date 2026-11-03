import { model, Schema } from "mongoose";

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tagSchema.virtual("articles", {
  ref: "ArticleTag",
  localField: "_id",
  foreignField: "tag",
});

export const TagModel = model("Tag", tagSchema);
