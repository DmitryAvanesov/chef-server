const express = require("express");
const mongoose = require("mongoose");
const recipeIngredientsRouter = express.Router();

const RecipeIngredient = mongoose.model("RecipeIngredient");

recipeIngredientsRouter.get("/", (_req, res) => {
  RecipeIngredient.find().then((recipeIngredients) => {
    res.send(recipeIngredients);
  });
});

recipeIngredientsRouter.post("/", (req, res) => {
  const recipeIngredient = new RecipeIngredient(req.body);

  recipeIngredient.save().then((newRecipeIngredient) => {
    newRecipeIngredient
      .populate([
        {
          path: "ingredient",
        },
        {
          path: "unit",
        },
      ])
      .execPopulate()
      .then((populatedRecipeIngredient) => {
        res.send(populatedRecipeIngredient);
      });
  });
});

recipeIngredientsRouter.patch("/:id", (req, res) => {
  const { id } = req.params;

  RecipeIngredient.findByIdAndUpdate(id, req.body, { new: true }).then(
    (recipeIngredient) => {
      recipeIngredient
        .populate([
          {
            path: "ingredient",
          },
          {
            path: "unit",
          },
        ])
        .execPopulate()
        .then((populatedRecipeIngredient) => {
          console.log(populatedRecipeIngredient);
          res.send(populatedRecipeIngredient);
        });
    }
  );
});

recipeIngredientsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  RecipeIngredient.findByIdAndDelete(id).then((result) => {
    res.send(result);
  });
});

module.exports = recipeIngredientsRouter;
