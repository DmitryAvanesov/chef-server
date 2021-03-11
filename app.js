const express = require("express");
const cors = require("cors");
const Database = require("./database/database");

require("dotenv").config();
require("./database/schemas/ingredients");
require("./database/schemas/units");

const ingredientsRouter = require("./routes/ingredients");
const unitsRouter = require("./routes/units");

const app = express();
app.use(cors({ origin: process.env.API_ORIGIN }));
app.use("/ingredients", ingredientsRouter);
app.use("/units", unitsRouter);
new Database();

module.exports = app;
