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
  ref: "Article",
  localField: "_id",
  foreignField: "tags",
});

export const TagModel = model("Tag", tagSchema);
