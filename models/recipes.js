const { Schema, Types, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const recipesSchema = new Schema({
  title: String,
  category: String,
  area: String,
  instructions: String,
  description: String,
  thumb: String,
  preview: String,
  time: String,
  youtube: String,
  tags: [],
  ingredients: [
    {
      _id: false,
      id: {
        type: Types.ObjectId,
        ref: "ingredient",
      },
      measure: String,
    },
  ],
});

recipesSchema.post("save", handleMongooseError);

const Recipe = model("recipe", recipesSchema);

module.exports = { Recipe };
