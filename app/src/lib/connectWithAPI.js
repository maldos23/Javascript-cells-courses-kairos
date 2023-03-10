let API_URL = "http://localhost:3000";

export function getAllCars(cars) {
  fetch(`${API_URL}/api/cars`, {
    method: "GET",
  })
  .then((res) => res.json())
  .then((response) => cars(response.data || []))
  .catch((err) => cars([]));
}

//---create new car api------
export function createCar(car) {
  console.log('create car:',car);
  fetch(`${API_URL}/api/cars`, {
    method: "POST",
    body: JSON.stringify(car),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then((res) => res.json())
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
}