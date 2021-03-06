const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.o95xp.gcp.mongodb.net:27017,cluster0-shard-00-01.o95xp.gcp.mongodb.net:27017,cluster0-shard-00-02.o95xp.gcp.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then()
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = Database;
