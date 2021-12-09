const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("../cors");
const recipeIngredientsRouter = express.Router();

const RecipeIngredient = mongoose.model("RecipeIngredient");

recipeIngredientsRouter.get("/", cors(corsOptions), (_req, res) => {
  RecipeIngredient.find().then((recipeIngredients) => {
    res.send(recipeIngredients);
  });
});

recipeIngredientsRouter.post("/", cors(corsOptions), (req, res) => {
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

recipeIngredientsRouter.patch("/:id", cors(corsOptions), (req, res) => {
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

recipeIngredientsRouter.delete("/:id", cors(corsOptions), (req, res) => {
  const { id } = req.params;

  RecipeIngredient.findByIdAndDelete(id).then((result) => {
    res.send(result);
  });
});

module.exports = recipeIngredientsRouter;
