const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  name: String,
});

mongoose.model("Unit", unitSchema);
