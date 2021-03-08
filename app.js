const express = require("express");
const cors = require("cors");
const Database = require("./database/database");

require("dotenv").config();
require("./database/schemas/ingredients");

const ingredientsRouter = require("./routes/ingredients");

const app = express();
app.use(cors({ origin: process.env.API_ORIGIN }));
app.use("/ingredients", ingredientsRouter);
new Database();

module.exports = app;
