const mongoose = require("mongoose");

const recipeIngredientSchema = new mongoose.Schema({
  ingredient: { type: mongoose.Types.ObjectId, ref: "Ingredient" },
  unit: { type: mongoose.Types.ObjectId, ref: "Unit" },
  quantity: Number,
});

mongoose.model("RecipeIngredient", recipeIngredientSchema);
