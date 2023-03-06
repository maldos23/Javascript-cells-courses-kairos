const carsModel = require("../model/cars.js");
const Joi = require("joi");

const carsPrototype = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  year: Joi.string().max(4).min(4).required(),
});

const carsPrototypeEdit = Joi.object({
  id: Joi.number().required(),
  name: Joi.string(),
  brand: Joi.string(),
  year: Joi.string().max(4).min(4),
});

const generateErrorApi = (error, res) =>
  res.json({ success: false, message: error.details[0].message });

function getAllCars(req, res) {
  res.json({ data: carsModel });
}

function createNewCars(req, res) {
  carsPrototype
    .validateAsync(req.body)
    .then((data) => {
      carsModel.push(data);
      res.json({ success: true });
    })
    .catch((error) => generateErrorApi(error, res));
}

function editCarModel(req, res) {
  carsPrototypeEdit
    .validateAsync({ id: Number(req.params.id), ...req.body })
    .then((data) => {
      carsModel[data.id] = {
        name: data.name,
        brand: data.brand,
        year: data.year,
      };

      res.json({ success: true, cars: carsModel });
    })
    .catch((error) => generateErrorApi(error, res));
}

function deleteCarModel(req, res) {
  const id = Number(req.params.id);

  if (carsModel.indexOf(id)) {
    carsModel.splice(id, 1);
    res.json({ success: true, data: carsModel });
  } else generateErrorApi("Id Invalid", res);
}

module.exports = { getAllCars, createNewCars, editCarModel, deleteCarModel };
