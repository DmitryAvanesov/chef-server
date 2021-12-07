const mongoose = require("mongoose");

const recipeStageSchema = new mongoose.Schema({
  number: Number,
  text: String,
  time: Number,
});

mongoose.model("RecipeStage", recipeStageSchema);
