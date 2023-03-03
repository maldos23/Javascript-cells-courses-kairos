const { Router } = require("express");
const {
  createNewCars,
  editCarModel,
  getAllCars,
  deleteCarModel,
} = require("../controllers/cars.js");

//Create router app
const router = Router();

router.get("/", getAllCars).post("/", createNewCars).put("/:id", editCarModel).delete("/:id", deleteCarModel);

module.exports = router;
