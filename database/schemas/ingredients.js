const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: String,
  units: [{ type: mongoose.Types.ObjectId, ref: "Unit" }],
  image: String,
});

mongoose.model("Ingredient", ingredientSchema);
