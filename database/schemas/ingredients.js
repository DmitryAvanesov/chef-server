const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: String,
    units: [Number]
});

mongoose.model("Ingredient", ingredientSchema)
