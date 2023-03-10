import {
  LitElement,
  html,
} from "https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module";

class AddCars extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      brand: { type: String },
      year: { type: Number },
    };
  }

  constructor() {
    super();
    this.name = "";
    this.brand = "";
    this.year = "";
  }

  render() {
    return html`
      <h1>Formulario</h1>
      <div class="container">
        <fieldset>
          <label>Name</label>
          <input id="name" type="text" requered />
        </fieldset>
        <fieldset>
          <label>Brand</label>
          <input id="brand" type="text" requered />
        </fieldset>
        <fieldset>
          <label>Year</label>
          <input id="year" type="number" requered />
        </fieldset>
        <div>
          <button class="btn" @click="${this.addCars}" type="submit">
            Enviar
          </button>
        </div>
      </div>
    `;
  }

  addCars() {
    this.name = document.getElementById("name");
    this.brand = document.getElementById("brand");
    this.year = document.getElementById("year");

    fetch("http://localhost:3000", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.name.value,
        brand: this.brand.value,
        year: this.year.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.dispatchEvent(
          new CustomEvent("addCar", {
            detail: { response, message: "Success added car" },
            bubbles: true,
            composed: true,
          })
        );
      })
      .catch((error) => console.error(error));
  }
}

customElements.define("add-cars", AddCars);
