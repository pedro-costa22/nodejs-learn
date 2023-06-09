import express from "express";
import sequelize from "./db/dbConnection";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(router);

//Create DB
(async () => {
    //Models
    const Users = require('./app/models/User');

    await sequelize.sync();

    app.listen(3000);
})();




