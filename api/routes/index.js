const carsRouter = require("./cars.js");
const { Router } = require("express");

const initCarsRouter = Router();

initCarsRouter.use(carsRouter);

module.exports = initCarsRouter;
