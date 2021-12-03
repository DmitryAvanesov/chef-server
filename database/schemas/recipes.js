const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [{ type: mongoose.Types.ObjectId, ref: "RecipeIngredient" }],
});

mongoose.model("Recipe", recipeSchema);
