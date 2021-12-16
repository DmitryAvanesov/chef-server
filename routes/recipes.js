const express = require("express");
const mongoose = require("mongoose");
const recipesRouter = express.Router();

const Recipe = mongoose.model("Recipe");
const RecipeStage = mongoose.model("RecipeStage");

recipesRouter.get("/", (req, res) => {
  Recipe.find()
    .populate([
      {
        path: "ingredients",
        populate: [
          {
            path: "ingredient",
            populate: "units",
          },
          {
            path: "unit",
          },
        ],
      },
      { path: "stages" },
    ])
    .then((recipes) => {
      res.send(
        recipes.filter((recipe) =>
          req.query.ingredients
            ? recipe.ingredients
                .map((recipeIngredient) =>
                  recipeIngredient.ingredient._id.toString()
                )
                .some((ingredientId) =>
                  req.query.ingredients.includes(ingredientId)
                )
            : recipe
        )
      );
    });
});

recipesRouter.post("/", (req, res) => {
  const recipe = new Recipe(req.body);

  recipe.save().then((newRecipe) => {
    newRecipe
      .populate([
        {
          path: "ingredients",
          populate: [
            {
              path: "ingredient",
              populate: "units",
            },
            {
              path: "unit",
            },
          ],
        },
        { path: "stages" },
      ])
      .execPopulate()
      .then((populatedRecipe) => {
        res.send(populatedRecipe);
      });
  });
});

recipesRouter.patch("/:id", (req, res) => {
  const { id } = req.params;

  RecipeStage.findOneAndUpdate(
    { number: 0 },
    { number: req.body.stages.length },
    { new: true },
    () => {
      Recipe.findByIdAndUpdate(
        id,
        {
          ...req.body,
          minutes: req.body.stages.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.minutes,
            0
          ),
        },
        {
          new: true,
        }
      ).then((recipe) => {
        recipe
          .populate([
            {
              path: "ingredients",
              populate: [
                {
                  path: "ingredient",
                  populate: "units",
                },
                {
                  path: "unit",
                },
              ],
            },
            { path: "stages" },
          ])
          .execPopulate()
          .then((populatedRecipe) => {
            res.send(populatedRecipe);
          });
      });
    }
  );
});

recipesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id).then((result) => {
    res.send(result);
  });
});

module.exports = recipesRouter;
