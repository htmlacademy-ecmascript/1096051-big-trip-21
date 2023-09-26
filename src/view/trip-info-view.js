import AbstractView from '../framework/view/abstract-view.js';
import {
  getDestinationsText,
  getTotalPrice,
  getTripDateText,
} from '../utils/info.js';

function createTripInfoTemplate(price, destinationsText, date) {
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinationsText}</h1>

        <p class="trip-info__dates">${date}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
      </p>
    </section>
  `;
}

export default class TripInfoView extends AbstractView {
  #points = null;
  constructor({ points }) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(
      getTotalPrice(this.#points),
      getDestinationsText(this.#points),
      getTripDateText(this.#points)
    );
  }
}
