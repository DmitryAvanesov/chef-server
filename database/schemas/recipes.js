const mongoose = require("mongoose");

const recipeIngredientSchema = new mongoose.Schema({
  ingredient: { type: mongoose.Types.ObjectId, ref: "Ingredient" },
  unit: { type: mongoose.Types.ObjectId, ref: "Unit" },
  quantity: Number,
});

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [{ type: mongoose.Types.ObjectId, ref: "RecipeIngredient" }],
});

mongoose.model("RecipeIngredient", recipeIngredientSchema);
mongoose.model("Recipe", recipeSchema);
