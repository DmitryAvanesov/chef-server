const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: String,
  units: [mongoose.Types.ObjectId],
  image: String,
});

mongoose.model("Ingredient", ingredientSchema);
