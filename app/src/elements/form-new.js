import { string } from "joi";
import { LitElement, html, css } from "lit";
import "bootstrap/dist/css/bootstrap.css";

export class AddNew extends LitElement {

    static get properties() {
        return {
            car: {
               type: Object,
            },
            URL_API: {type: String},
        };
    }

    static get styles() {
        console.log("styles");
    const { cssRules } = document.styleSheets[0];
    const gobalStyle = css([
      Object.values(cssRules)
        .map((rule) => rule.cssText)
        .join("\n"),
    ]);
    return [
      gobalStyle,
    ];
    }

    constructor() {
        super();
        this.car = {}
        this.URL_API = "http://localhost:3000/api/cars";
    }

    render() {
        return html`
        <h2>Agregar nuevo registro</h2>
        <label>Nombre</label>
        <input id="name" type="text" placeholder="Agrega el nombre">
        <label>Marca</label>
        <input id="brand" type="text" placeholder="Agrega la marca">
        <label>Modelo</label>
        <input id="year" type="text" placeholder="Agrega el año">
        <br></br>
        <button type="button" class="btn btn-primary" @click="${this._sendData}">Agregar nuevo</button>
        `;
    }


    _sendData(){
        const dataName =this.shadowRoot.querySelector("#name").value;
        const dataBrand =this.shadowRoot.querySelector("#brand").value;
        const dataYear =this.shadowRoot.querySelector("#year").value;
        const dataCar = {name: dataName, 
                        brand: dataBrand, 
                        year: dataYear};
        this._AddNewCar(dataCar); 
       }


    _AddNewCar(data){
        fetch(this.URL_API, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
        .then((response) => response.json() )
        .then(data => {
            this.dispatchEvent(new CustomEvent('send-new-car', {detail: data, composed: true, bubbles: true}))
        })
        .catch((error) => {this.dispatchEvent(new CustomEvent('error-api'))});
    }
}

export default customElements.define('add-new', AddNew);