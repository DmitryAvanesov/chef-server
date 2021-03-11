const express = require("express");
const mongoose = require("mongoose");
const unitsRouter = express.Router();

const Unit = mongoose.model("Unit");

unitsRouter.get("/", function (req, res) {
  Unit.find().then((units) => {
    res.send(units);
  });
});

unitsRouter.post("/", function (req, res) {
  const unit = new Unit(req.body);

  unit.save().then((newUnit) => {
    res.send(newUnit);
  });
});

module.exports = unitsRouter;
