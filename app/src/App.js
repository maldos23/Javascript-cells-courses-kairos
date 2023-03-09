import { useEffect, useState } from "react";
import "./elements/example";
import "./elements/carsForm";
import "./styles/index.css"

const URL_API = "http://localhost:3000";

function App() {
  const [cars, setCars] = useState([]);

  const getAllMyCars = () => {
    fetch(`${URL_API}/api/cars`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then(({ data }) => setCars(data))
    .catch((error) => console.error(error));
  };

  useEffect(() => {
    
    getAllMyCars();
    return; 
  },[]);

  return (
    <div className="App">
      <cars-table cars={JSON.stringify(cars)}></cars-table>
      <cars-form></cars-form>
    </div>
  );
}

export default App;
