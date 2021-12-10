const express = require("express");
const mongoose = require("mongoose");
const ingredientsRouter = express.Router();

const Ingredient = mongoose.model("Ingredient");

ingredientsRouter.get("/", (_req, res) => {
  Ingredient.find()
    .populate("units")
    .then((ingredients) => {
      res.send(ingredients);
    });
});

ingredientsRouter.post("/", (req, res) => {
  const ingredient = new Ingredient(req.body);

  ingredient.save().then((newIngredient) => {
    newIngredient
      .populate("units")
      .execPopulate()
      .then((populatedIngredient) => {
        res.send(populatedIngredient);
      });
  });
});

ingredientsRouter.patch("/:id", (req, res) => {
  const { id } = req.params;

  Ingredient.findByIdAndUpdate(id, req.body, { new: true }).then(
    (ingredient) => {
      ingredient
        .populate("units")
        .execPopulate()
        .then((populatedIngredient) => {
          res.send(populatedIngredient);
        });
    }
  );
});

ingredientsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  Ingredient.findByIdAndDelete(id).then((result) => {
    res.send(result);
  });
});

module.exports = ingredientsRouter;
