import { LitElement, html, css } from "lit";
import "bootstrap/dist/css/bootstrap.css";

export class AddCarForm extends LitElement {
  static get is() {
    return "form-add-car";
  }

  static get styles() {
    console.log("styles");
  }

  static get properties() {
    console.log("properties");
    return {
      cars: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    console.log("constructor");
    Object.assign(this, {
      active: false,
      selectedIndex: 0,
      cars: [],
    });
    this.cars = [];
    this.headers = [];
  }

  extractFieldsHeaders() {
    let keys = Object?.keys(this?.cars[0]);
    if (this.cars?.length > 0 && keys.length !== this.headers.length) {
      this.headers = keys.map((key, index) => ({ index, field: key }));
      this.requestUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("connectedCallback");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("disconnectedCallback");
  }

  updated() {
    super.updated();
    console.log("updated");
    this.extractFieldsHeaders();
  }
  firstUpdated() {
    super.firstUpdated();
    console.log("firstUpdated");
  }

  update() {
    super.update();
    console.log("update");
  }

  render() {
    console.log("render");
    return html`<div>
      <form action="http://localhost:3000/api/cars/" method="POST" id="formAddCar">
        <input placeholder="Enter name car" />
        <input placeholder="Enter brand car"/>
        <input placeholder="Enter model car" />
      </form>
    </div>`;
  }
}

// eslint-disable-next-line no-undef
export default customElements.define(AddCarForm.is, AddCarForm);
