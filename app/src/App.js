import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./elements/example";
import "./elements/form-new";
import "./styles/index.css";
import "./App.css";

const URL_API = "http://localhost:3000";

function App() {
  const [cars, setCars] = useState([]);

  document.body.addEventListener("send-new-car", f => {
    getAllMyCars();
  });

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
      <add-new></add-new>
      <br></br>
      <br></br>
      <cars-table cars={JSON.stringify(cars)}></cars-table>      
    </div>
  );

}

export default App;
