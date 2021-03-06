const express = require("express");
const mongoose = require("mongoose");
const recipeStageRouter = express.Router();

const RecipeStage = mongoose.model("RecipeStage");

recipeStageRouter.get("/", (_req, res) => {
  RecipeStage.find().then((recipeStages) => {
    res.send(recipeStages);
  });
});

recipeStageRouter.post("/", (req, res) => {
  const recipeStage = new RecipeStage(req.body);

  recipeStage.save().then((newRecipeStage) => {
    res.send(newRecipeStage);
  });
});

recipeStageRouter.patch("/:id", (req, res) => {
  const { id } = req.params;

  RecipeStage.findByIdAndUpdate(id, req.body, { new: true }).then(
    (recipeIngredient) => {
      res.send(recipeIngredient);
    }
  );
});

recipeStageRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  RecipeStage.findByIdAndDelete(id).then((result) => {
    res.send(result);
  });
});

module.exports = recipeStageRouter;
