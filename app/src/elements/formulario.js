import { LitElement, html, css } from "lit";
import "bootstrap/dist/css/bootstrap.css";

class carsForm extends LitElement{
    static get properties(){
        return {
            carData: {type: Object},
            URL_API: {type: String},
          };
    };

    static get styles() {
    console.log("styles");
    const { cssRules } = document.styleSheets[0];
    const globalStyle = css([
      Object.values(cssRules)
        .map((rule) => rule.cssText)
        .join("\n"),
    ]);
    return [
      globalStyle,      
      css`
      div {
        margin:12px 6px;
      }
      .formulario{
        box-shadow: 1px 1px 3px #aaa;
        display:flex;
        flex-direction:column;
        padding:6px;
      }
      #btn-add{
        margin:8px 24px;
      }
    `,
    ];
    }

    constructor(){
        super();
        this.URL_API = 'http://localhost:3000/api/cars';
        this.carData = {
          name: '',
          brand: '',
          year: '',}
    }

    inputChange(event){
        const { name, value } = event.target;

        this.carData = {
          ...this.carData,
          [name]: value,
    }
    }

    addNewCar() {
        const data= {
          name: this.carData.name,
          brand: this.carData.brand,
          year: this.carData.year,
        };
        fetch(this.URL_API, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {this.dispatchEvent
            (new CustomEvent('send-car', {detail: data,composed: true,bubbles: true,}));})
          .catch((error) => {this.dispatchEvent
            (new CustomEvent('error-api'));});
      }

    render(){
        return html`
        <div class="formulario">
        <h2>Agregar un nuevo registro</h2>
            <form>
                    <div>
                    <span>Nombre</span>
                    <input id="name" @input=${this.inputChange} placeholder="Ingresa el nombre">
                    </div>
                    <div>
                    <span>Marca</span>
                    <input id="brand" @input=${this.inputChange} placeholder="Ingresa una marca">
                    </div>
                    <div>
                    <span>Año</span>
                    <input id="year" @input=${this.inputChange} placeholder="Ingresa un año">
                    </div>
            </form>
            <button id="btn-add" class="btn btn-primary" @click=${this.addNewCar} >Agregar</button>
        </div>`
    }
}
export default customElements.define('cars-form',carsForm)