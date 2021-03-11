const express = require("express");
const mongoose = require("mongoose");
const ingredientsRouter = express.Router();

const Ingredient = mongoose.model("Ingredient");

ingredientsRouter.get("/", function (req, res) {
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

module.exports = ingredientsRouter;
