const express = require("express");
const mongoose = require("mongoose");
const recipesRouter = express.Router();

const Recipe = mongoose.model("Recipe");

recipesRouter.get("/", function (_req, res) {
  Recipe.find()
    .populate("ingredients")
    .then((recipes) => {
      res.send(recipes);
    });
});

recipesRouter.post("/", function (req, res) {
  const recipe = new Recipe(req.body);

  recipe.save().then((newRecipe) => {
    newRecipe
      .populate("ingredients")
      .execPopulate()
      .then((populatedRecipe) => {
        res.send(populatedRecipe);
      });
  });
});

recipesRouter.patch("/:id", function (req, res) {
  const { id } = req.params;

  Recipe.findByIdAndUpdate(id, req.body, { new: true }).then((recipe) => {
    recipe
      .populate("ingredients")
      .execPopulate()
      .then((populatedRecipe) => {
        res.send(populatedRecipe);
      });
  });
});

module.exports = recipesRouter;
