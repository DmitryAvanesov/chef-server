const express = require("express");
const mongoose = require("mongoose");
const recipeStageRouter = express.Router();

const RecipeStage = mongoose.model("RecipeStage");

recipeStageRouter.get("/", function (_req, res) {
  RecipeStage.find().then((recipeStages) => {
    res.send(recipeStages);
  });
});

recipeStageRouter.post("/", function (req, res) {
  const recipeStage = new RecipeStage(req.body);

  recipeStage.save().then((newRecipeStage) => {
    res.send(newRecipeStage);
  });
});

module.exports = recipeStageRouter;
