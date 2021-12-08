const express = require("express");
const mongoose = require("mongoose");
const recipesRouter = express.Router();

const Recipe = mongoose.model("Recipe");
const RecipeStage = mongoose.model("RecipeStage");

recipesRouter.get("/", function (_req, res) {
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
      res.send(recipes);
    });
});

recipesRouter.post("/", function (req, res) {
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

recipesRouter.patch("/:id", function (req, res) {
  const { id } = req.params;

  RecipeStage.findOneAndUpdate(
    { number: 0 },
    { number: req.body.stages.length },
    { new: true },
    () => {
      Recipe.findByIdAndUpdate(id, req.body, {
        new: true,
      }).then((recipe) => {
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

module.exports = recipesRouter;
