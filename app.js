const express = require("express");
const cors = require("cors");
const Database = require("./database/database");

require("dotenv").config();
require("./database/schemas/recipes");
require("./database/schemas/recipeIngredients");
require("./database/schemas/recipeStages");
require("./database/schemas/ingredients");
require("./database/schemas/units");

const bodyParser = require("body-parser");
const recipesRouter = require("./routes/recipes");
const recipeIngredientsRouter = require("./routes/recipeIngredients");
const recipeStagesRouter = require("./routes/recipeStages");
const ingredientsRouter = require("./routes/ingredients");
const unitsRouter = require("./routes/units");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: process.env.API_ORIGIN }));
app.use("/recipes", recipesRouter);
app.use("/recipe-ingredients", recipeIngredientsRouter);
app.use("/recipe-stages", recipeStagesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/units", unitsRouter);
new Database();

module.exports = app;
