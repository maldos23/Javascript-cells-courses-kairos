let API_URL = "http://localhost:3000";

export function getAllCars(cars) {
  fetch(`${API_URL}/api/cars`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => cars(response.data || []))
    .catch((err) => cars([]));
}

export function createCar(car) {
  fetch(`${API_URL}/api/cars`, {
    method: "POST",
    body: car
  })
    .then((res) => res.json())
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
}