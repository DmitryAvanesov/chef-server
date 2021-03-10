const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: String,
  units: [Number],
  image: String,
});

mongoose.model("Ingredient", ingredientSchema);
