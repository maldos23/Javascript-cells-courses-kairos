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

/**
 * @name generateErrorApi
 * @description This method create a new error response API
 * @param {string|object} error - Text insert on message object
 * @param {object} res
 * @returns res.json({ success: false, message: error.details[0].message })
 */
const generateErrorApi = (error, res) =>
  res.status(400).json({
    success: false,
    message: typeof error === "object" ? error.details[0].message : error,
  });

function getAllCars(req, res) {
  res.json({ data: carsModel });
}

/**
 * @name createNewCars
 * @description This method inserts a new car into 'carsModels'
 * @param {object} req required Object to add a new element
 * @param {object} res response object with new element data
 * @returns res.json({ success: true });
 */
function createNewCars(req, res) {
  console.log(req.body);
  carsPrototype
    .validateAsync(req.body)
    .then((data) => {
      carsModel.push(data);
      res.json({ success: true });
    })
    .catch((error) => generateErrorApi(error, res));
}

/**
 * @name editCarModel
 * @description This function modified a car in carsModel
 * @param {object} req - required object to edit elements
 * @param {object} res - response object success edit
 * @returns res.json({ success: true, cars: carsModel })
 */

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

/**
 * @name deleteCarModel
 * @description This method delete a object fot the api
 * @param {object} req - Get the id for the object a delete
 * @param {object} res - Response of json message
 * @returns res.json({ success: true, data: carsModel }) || generateErrorApi("Id Invalid", res)
 */
function deleteCarModel(req, res) {
  const id = Number(req.params.id);

  if (carsModel.indexOf(id)) {
    carsModel.splice(id, 1);
    res.json({ success: true, data: carsModel });
  } else generateErrorApi("Id Invalid", res);
}

module.exports = { getAllCars, createNewCars, editCarModel, deleteCarModel };
