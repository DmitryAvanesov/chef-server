const mongoose = require("mongoose");

const recipeStageSchema = new mongoose.Schema({
  number: Number,
  description: String,
  minutes: Number,
});

mongoose.model("RecipeStage", recipeStageSchema);
