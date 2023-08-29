import AbstractView from '../framework/view/abstract-view.js';
import { getTypes } from '../mock/types.js';
import { getDestinationsNames } from '../mock/destinations.js';
import { getHumanizeEventTime } from '../utils/time.js';
import { getTypeOffers } from '../mock/offers.js';


function createDestinationTemplate(destination) {
  return `<option value="${destination}"></option>`;
}

function createTypeItemTemplate(type) {
  return `
    <div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`;
}

function createOfferTemplate(offer) {
  const {id, text, price} = offer;

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" checked>
      <label class="event__offer-label" for="event-offer-${id}-1">
        <span class="event__offer-title">${text}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
}

function createTripItemEditTemplate(point) {
  const {
    destination,
    type,
    startTime,
    endTime,
    price
  } = point;
  const {name, description} = destination;

  const offers = getTypeOffers(type);
  const offersElements = offers.map((offer) => createOfferTemplate(offer)).join('');
  const typesElements = Object.values(getTypes()).map((item) => createTypeItemTemplate(item)).join('');
  const destionationsElements = Object.values(getDestinationsNames()).map((item) => createDestinationTemplate(item)).join('');

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typesElements};
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destionationsElements}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getHumanizeEventTime(startTime, 'FORM')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getHumanizeEventTime(endTime, 'FORM')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersElements}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
          </section>
        </section>
      </form>
    </li>
  `;
}

export default class TripItemEditView extends AbstractView{
  #point = null;
  #handleFormSubmit = null;
  #handleButtonClick = null;

  constructor({point, onFormSubmit, onArrowClick}) {
    super();
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonClick = onArrowClick;

    this.element.querySelector('form')
      .addEventListener('submit', this.#submitFormHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#arrowButtonClickHandler);
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #arrowButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };

  get template() {
    return createTripItemEditTemplate(this.#point);
  }
}
