const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const ingredientsSchema = new Schema({
  ttl: String,
  desc: String,
  t: String,
  thb: String,
});

ingredientsSchema.post("save", handleMongooseError);

const Ingredient = model("ingredient", ingredientsSchema);

module.exports = { Ingredient };
