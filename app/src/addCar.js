import { useEffect, useState } from "react";
import "./elements/addCarForm";
import "./styles/index.css"

const URL_API = "http://localhost:3000";

function App() {
  const [cars, setCars] = useState([]);

  const getAllMyCars = () => {
    fetch(`${URL_API}/api/cars`, {
      method: "POST",
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
      <form-add-car></form-add-car>
    </div>
  );
}

export default App;
