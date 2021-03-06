const express = require("express");
const mongoose = require("mongoose");
const unitsRouter = express.Router();

const Unit = mongoose.model("Unit");

unitsRouter.get("/", (req, res) => {
  Unit.find().then((units) => {
    res.send(units);
  });
});

unitsRouter.post("/", (req, res) => {
  const unit = new Unit(req.body);

  unit.save().then((newUnit) => {
    res.send(newUnit);
  });
});

unitsRouter.patch("/:id", (req, res) => {
  const { id } = req.params;

  Unit.findByIdAndUpdate(id, req.body, { new: true }).then((unit) => {
    res.send(unit);
  });
});

unitsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  Unit.findByIdAndDelete(id).then((result) => {
    res.send(result);
  });
});

module.exports = unitsRouter;
