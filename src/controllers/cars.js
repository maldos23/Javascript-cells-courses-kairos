const carsModel = require( "../model/cars.js");
const Joi = require( "joi");

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
  carsPrototypeEdit.validateAsync({ id: Number(req.params.id), ...req.body })
    .then((data) => {

      carsModel[data.id] = {
        name: data.name,
        brand: data.brand,
        year: data.year
      };

      res.json({ success: true, cars: carsModel });
    })
    .catch((error) => generateErrorApi(error, res));
}

//TODO: Crea un modelo el cual elimine carros en el siguiente metodo
// investigación hecha por Youtube y stackOverflow, necesito practicar con un splice
// porque me quedaron dudas con esa funcon
function deleteCarModel(req, res) {
  const id = req.params.id; //segun con esto se obtiene el id del modelo del carro que se va a eliminar
  db.deleteCarModel(id, (error, resultado) => {
    if(error){
      res.stattus(500).json({mensaje: "Error al eliminar el modelo"});
    }else{
      res.json({mensaje: "Modelo eliminado correctamente"});
    }
  });
}

module.exports = { getAllCars, createNewCars, editCarModel, deleteCarModel };
