const express = require("express");
const mongoose = require("mongoose");
const recipeIngredientsRouter = express.Router();

const RecipeIngredient = mongoose.model("RecipeIngredient");

recipeIngredientsRouter.post("/", function (req, res) {
  const recipeIngredient = new RecipeIngredient(req.body);

  recipeIngredient.save().then((newRecipeIngredient) => {
    newRecipeIngredient
      .populate("ingredient")
      .populate("unit")
      .execPopulate()
      .then((populatedRecipeIngredient) => {
        res.send(populatedRecipeIngredient);
      });
  });
});

module.exports = recipeIngredientsRouter;
