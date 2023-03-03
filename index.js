const dotenv = require("dotenv");
const express = require("express");
const initCarsRouter = require("./src/routes/index.js");

//Enviroment
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
//Charters
app.use(express.json());
app.use("/api/cars", initCarsRouter);

//Listen
app.listen(PORT, () => console.log("Server on port:", PORT));
