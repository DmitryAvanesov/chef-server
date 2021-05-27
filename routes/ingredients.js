const express = require("express");
const mongoose = require("mongoose");
const ingredientsRouter = express.Router();

const Ingredient = mongoose.model("Ingredient");
const Unit = mongoose.model("Unit");

ingredientsRouter.get("/", function (_req, res) {
  Ingredient.find().then((ingredients) => {
    Unit.find().then((units) => {
      for (const ingredient of ingredients) {
        for (const [index] of ingredient.units.entries()) {
          console.log(
            units.find((unit) => {
              console.log(
                unit._id,
                ingredient.units[index],
                unit._id == ingredient.units[index]
              );
            })
          );

          ingredient.units[index] = units.find(
            (unit) => unit._id === ingredient.units[index]
          );
        }
      }

      res.send(ingredients);
    });
  });
});

ingredientsRouter.post("/", function (req, res) {
  const ingredient = new Ingredient(req.body);

  ingredient.save().then((newIngredient) => {
    res.send(newIngredient);
  });
});

ingredientsRouter.patch("/:id", function (req, res) {
  const { id } = req.params;

  Ingredient.findByIdAndUpdate(id, req.body, { new: true }).then(
    (ingredient) => {
      res.send(ingredient);
    }
  );
});

ingredientsRouter.delete("/:id", function (req, res) {
  const { id } = req.params;

  Ingredient.findByIdAndDelete(id).then((result) => {
    res.send(result);
  });
});

module.exports = ingredientsRouter;
