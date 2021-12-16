const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [{ type: mongoose.Types.ObjectId, ref: "RecipeIngredient" }],
  stages: [{ type: mongoose.Types.ObjectId, ref: "RecipeStage" }],
  image: String,
  minutes: Number,
});

mongoose.model("Recipe", recipeSchema);
