import { LitElement, html, css} from "lit";
import "bootstrap/dist/css/bootstrap.css";

export class newCarForm extends LitElement {
  static get is() {
    return "newcar-form";
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
      css`
        label {
          margin: 16px ;
        }
        input {
          margin: 10px;
        }
        button {
            margin: 10px;
          }

      `,
    ];
  }

  static get properties() {
    console.log("properties");
    return {
      newcarName: {
        type: String,
      },
      newBrand: {
        type: String,
      },
      newYear: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    this.newcarName = '';
    this.newBrand = '';
    this.newYear = 0;
  }

  newCarI(event) {
    const newCar = event.target;
    if(newCar.id === 'carName') this.newcarName = newCar.value;
    if(newCar.id === 'carBrand') this.newBrand = newCar.value;
    if(newCar.id === 'carYear') this.newYear = newCar.value;
  }

  addNewCar(event) {
    event.preventDefault();
    console.log('enviando un nuevo auto');
    if(this.newcarName === '' || this.newBrand === '' || this.newYear === '') throw new Error('Opps!, Dejaste algun campo vacio')
  }

  render() {
    return html`
    <form class="col g-3">
  <div class="col-md-6">
  
  <label for="inputPassword4" class="form-label">Nombre del carro: </label>
    <input @input=${this.newCarI} type="text" id="carName" class="form-control" placeholder="Ej.: Camaro, Challenger, Mustang...">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Marca del carro: </label>
    <input @input=${this.newCarI} type="text" id="carBrand" class="form-control" placeholder="Ej.: Mazda, Chevrolet, Nissan">
  </div>
  <div class="col-md-6">
    <label for="inputAddress" class="form-label">Año del carro: </label>
     <input @input=${this.newCarI} type="text" id="carYear" class="form-control" placeholder="Ej.: 2010, 2009, 2008">
  </div>

  <div class="col-12">
    <button type="submit" class="btn btn-success">Guardar carro</button>
  </div>
</form>`;
  }
}

// eslint-disable-next-line no-undef
export default customElements.define(newCarForm.is, newCarForm);