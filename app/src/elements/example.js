import { LitElement, html, css } from "lit";
import "bootstrap/dist/css/bootstrap.css";
import "./carsForm";

const URL_API = "http://localhost:3000";
console.log("Creacion");

export class CarsTable extends LitElement {
  static get is() {
    return "cars-table";
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
        th {
          color: purple;
        }
      `,
    ];
  }

  static get properties() {
    console.log("properties");
    return {
      cars: {
        type: Array,
      },
      children: {
        type: Object,
        required: true,
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
    this.children = null;
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

  sendMyNewCar({ name, brand, year }) {
    fetch(`${URL_API}/api/cars`, {
      method: "POST",
      body: JSON.stringify({ name, brand, year }),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    ;
  }

  render() {
    console.log("render");
    return html`<div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            ${this?.headers.map((key) => {
              return html`<th scope="col">${key.field?.toUpperCase()}</th>`;
            })}
          </tr>
        </thead>
        <tbody>
          ${this.cars.map((car, id) => {
            let td = this.headers.map(
              (head) => html`<td>${car[head.field]}</td>`
            );

            return html`<tr>
              <td scope="row">${id}</td>
              ${td}
            </tr>`;
          })}
        </tbody>
      </table>
      <cars-form @onsendcar="${(newcar) => this.sendMyNewCar(newcar.detail)}"></cars-form>
    </div>`;
  }
}

// eslint-disable-next-line no-undef
export default customElements.define(CarsTable.is, CarsTable);
