const mongoose = require("mongoose");

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        const user = "admin";
        const password = "admin";
        const database = "biathlon";

        mongoose.connect(
            `mongodb+srv://${user}:${password}>@cluster0.o95xp.gcp.mongodb.net/${database}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        const db = mongoose.connection;

        db.once("open", function () {
            alert("opened innit");
        });
    }
}

module.exports = Database;
