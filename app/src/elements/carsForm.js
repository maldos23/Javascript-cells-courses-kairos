import { LitElement, html, css } from "lit";

export class CarsForm extends LitElement {
  static get styles() {
    return css`
      .form-car {
        display: flex;
        flex-direction: column;
        margin: 0rem 4rem;
      }

      .form-car > input {
        margin: 5px 10px;
      }

      .form-car > button {
        margin: 10px 5px;
      }
    `;
  }

  static get is() {
    return "cars-form";
  }

  connectedCallback() {
    super.connectedCallback();
  }

  handleNewCar(event) {
    // si era así verda? //
    const { value: name } = event.submitter.form[0];
    const { value: brand } = event.submitter.form[1];
    const { value: year } = event.submitter.form[2];
    //creo que en esta parte lo
    let eventCar = new CustomEvent("onsendcar", {
      detail: { name, brand, year },
    });
    this.dispatchEvent(eventCar);
    event.preventDefault();
  }

  render() {
    return html`
      <form id="new-car" class="form-car" @submit=${this.handleNewCar}>
        <h3>Create a new car</h3>
        <label for="name">Model</label>
        <input id="name" type="text" />
        <label for="brand">Brand</label>
        <input id="brand" type="text" />
        <label for="year">Year</label>
        <input id="year" type="text" />
        <br />
        <button type="submit">Send</button>
      </form>
    `;
  }
}

export default customElements.define(CarsForm.is, CarsForm);
