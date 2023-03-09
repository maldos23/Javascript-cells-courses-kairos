import { LitElement, html, css } from "lit";
import "bootstrap/dist/css/bootstrap.css";
import { createCar } from "../lib/connectWithAPI";
console.log("Creacion");

export class CarsForm extends LitElement {
  static get is() {
    return "cars-form";
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
        div {
          margin: 16px 0;
        }
        p {
          margin: 0;
        }
      `,
    ];
  }

  static get properties() {
    console.log("properties");
    return {
      inputCarName: {
        type: String,
      },
      inputBrand: {
        type: String,
      },
      inputYear: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    console.log("constructor");
    // Object.assign(this, {
    //   active: false,
    //   selectedIndex: 0,
    //   cars: [],
    // });
    this.inputCarName = '';
    this.inputBrand = '';
    this.inputYear = 0;
  }

  inputsChange(event) {
    const input = event.target;
    if(input.id === 'name') this.inputCarName = input.value;
    if(input.id === 'brand') this.inputBrand = input.value;
    if(input.id === 'year') this.inputYear = input.value;
  }

  sendNewCar(event) {
    event.preventDefault();
    console.log('enviando un nuevo auto');
    if(!this.inputCarName || !this.inputBrand || !this.inputYear) throw new Error('No puede haber espacios en blanco')
    // if(!this.inputCarName || !this.inputBrand || !this.inputYear) return console.log('hay espacios vacios');
    let newCar = {
      name: this.inputCarName,
      brand: this.inputBrand,
      year: this.inputYear,
    }
    console.log(newCar);
    // createCar(newCar)
  }

  render() {
    return html`
    <form action="">
      <div>
        <p>${this.inputCarName ? this.inputCarName : 'Escribe el nombre del auto' }</p>
        <input @input=${this.inputsChange} type="text" id="name" placeholder="Nombre del auto">
      </div>

      <div>
        <p>${this.inputBrand ? this.inputBrand : 'Escribe la marca del auto' }</p>
        <input @input=${this.inputsChange} type="text" id="brand" placeholder="Marca">
      </div>

      <div>
        <p>${this.inputYear ? this.inputYear : 'Escribe el año del auto' }</p>
        <input @input=${this.inputsChange} type="number" id="year" placeholder="Año">
      </div>

      <button @click=${this.sendNewCar}>Enviar</button>
    </form>`;
  }
}

// eslint-disable-next-line no-undef
export default customElements.define(CarsForm.is, CarsForm);
