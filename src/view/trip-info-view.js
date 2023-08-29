import AbstractView from '../framework/view/abstract-view.js';
import { getHumanizeEventTime } from '../utils/time.js';

function createTripInfoTemplate(price, destinations, date) {
  const destinationsText = destinations.join(' \u2013 ');

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
  constructor({points}) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(
      this.#getTotalPrice(),
      this.#getDestinations(),
      this.#getTripDateText()
    );
  }

  #getTotalPrice() {
    const initialValue = 0;
    return this.#points.reduce((total, point) => total + point.price, initialValue);
  }

  #getDestinations() {
    return this.#points.map((point) => point.destination.name);
  }

  #getStartTripDate() {
    const minDate = Math.min(...this.#points.map((point) => point.startTime));
    return getHumanizeEventTime(minDate, 'TRIP_DATE');
  }

  #getEndTripDate() {
    const maxDate = Math.max(...this.#points.map((point) => point.startTime));
    return getHumanizeEventTime(maxDate, 'TRIP_DATE');
  }

  #getTripDateText() {
    const startDate = this.#getStartTripDate().split(' ');
    const endDate = this.#getEndTripDate().split(' ');
    const startDateMonth = startDate[0];
    const endDateMonth = endDate[0];
    let text = `${this.#getStartTripDate()} \u2013 ${this.#getEndTripDate()}`;

    if (startDateMonth === endDateMonth) {
      text = `${startDate.join(' ')} \u2013 ${endDate[1]}`;
    }

    return text;
  }
}

