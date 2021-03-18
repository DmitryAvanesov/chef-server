const express = require("express");
const mongoose = require("mongoose");
const ingredientsRouter = express.Router();

const Ingredient = mongoose.model("Ingredient");

ingredientsRouter.get("/", function (_req, res) {
  Ingredient.find().then((ingredients) => {
    res.send(ingredients);
  });
});

ingredientsRouter.post("/", function (req, res) {
  const ingredient = new Ingredient(req.body);

  ingredient.save().then((newIngredient) => {
    res.send(newIngredient);
  });
});

ingredientsRouter.delete("/:id", function (req, res) {
  const { id } = req.params;

  Ingredient.deleteOne({ _id: id }).then((result) => {
    res.send(result);
  });
});

module.exports = ingredientsRouter;
