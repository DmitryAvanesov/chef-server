const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("../cors");
const ingredientsRouter = express.Router();

const Ingredient = mongoose.model("Ingredient");

ingredientsRouter.get("/", cors(corsOptions), (_req, res) => {
  Ingredient.find()
    .populate("units")
    .then((ingredients) => {
      res.send(ingredients);
    });
});

ingredientsRouter.post("/", cors(corsOptions), (req, res) => {
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

ingredientsRouter.patch("/:id", cors(corsOptions), (req, res) => {
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

ingredientsRouter.delete("/:id", cors(corsOptions), (req, res) => {
  const { id } = req.params;

  Ingredient.findByIdAndDelete(id).then((result) => {
    res.send(result);
  });
});

module.exports = ingredientsRouter;
