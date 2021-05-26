const mongoose = require("mongoose");
const unitSchema = require("./units");

const ingredientSchema = new mongoose.Schema({
  name: String,
  units: [unitSchema],
  image: String,
});

mongoose.model("Ingredient", ingredientSchema);
