import { getTypes } from '../mock/types.js';
import { getHumanizeEventTime } from '../utils/time.js';
import { capitalizeWord } from '../utils/utils.js';
import { getTypeOffers } from '../mock/offers.js';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import DatepickerAbstract from './datepicker-abstract.js';
import { DATE_TYPE } from '../const.js';


function createPhotoTemplate(photoURL) {
  return `<img class="event__photo" src="${photoURL}" alt="Event photo"></img>`;
}

function createDestinationTemplate(destination) {
  return `<option value="${destination}"></option>`;
}

function createTypeItemTemplate(type) {
  const typeLower = type.toLowerCase();
  return `
    <div class="event__type-item">
      <input id="event-type-${typeLower}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeLower}">
      <label class="event__type-label  event__type-label--${typeLower}" for="event-type-${typeLower}-1">${type}</label>
    </div>`;
}

function createOfferTemplate({id, text, price}) {
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

function createTripItemEditTemplate(point, names) {
  const {
    destination,
    type,
    startTime,
    endTime,
    price
  } = point;
  const {name, description, photos} = destination;
  const offers = getTypeOffers(type);
  const offersElements = offers.map(createOfferTemplate).join('');
  const typesElements = Object.values(getTypes()).map(createTypeItemTemplate).join('');
  const destionationsElements = names.map(createDestinationTemplate).join('');
  const photosElements = photos.map(createPhotoTemplate).join('');

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

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${photosElements}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
}

export default class TripItemEditView extends AbstractStatefulView{
  #point = null;
  #destinationsNames = null;

  #handleFormSubmit = null;
  #handleButtonClick = null;
  #handleTypeChange = null;
  #handleDestinationChange = null;
  #handleDateChange = null;

  #datepicker = null;

  constructor({ point, destinationsNames, onFormSubmit, onArrowClick, onTypeChange, onDestinationChange, onDateChange }) {
    super();
    this.#point = point;
    this.#destinationsNames = destinationsNames;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonClick = onArrowClick;
    this.#handleTypeChange = onTypeChange;
    this.#handleDestinationChange = onDestinationChange;
    this.#handleDateChange = onDateChange;

    this.#datepicker = new DatepickerAbstract({ point, onDateChange: this.#updateDate });

    this._setState(TripItemEditView.parsePointToStatic(this.#point));
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#submitFormHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#arrowButtonClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('#event-destination-1')
      .addEventListener('input', this.#destinationChangeHandler);

    this.#datepicker.createCalendar(this.element.querySelector('#event-start-time-1'), DATE_TYPE.START);
    this.#datepicker.createCalendar(this.element.querySelector('#event-end-time-1'), DATE_TYPE.END);
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #arrowButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };

  removeElement() {
    super.removeElement();

    this.#datepicker.removeElement();
  }

  #typeChangeHandler = (evt) => {
    const newType = capitalizeWord(evt.target.value);

    evt.preventDefault();
    this.updateElement({...this.#point, type: newType});
    this.#handleTypeChange(TripItemEditView.parseStateToPoint(this._state));
  };

  #updateDate = (evt, isStartTime) => {
    this.updateElement({...this.#point, [isStartTime ? 'startTime' : 'endTime']: new Date(evt)});

    this.#handleDateChange(TripItemEditView.parseStateToPoint(this._state));
  };

  #destinationChangeHandler = (evt) => {
    const destinationName = evt.target.value;

    evt.preventDefault();
    this.#handleDestinationChange(this.#point, destinationName);
  };

  get template() {
    return createTripItemEditTemplate(this._state, this.#destinationsNames);
  }

  static parseStateToPoint(state) {// todo убрать метод, если расширение не потребует.
    return {...state};
  }

  static parsePointToStatic(point) {// todo убрать метод, если расширение не потребует.
    return {...point};
  }
}
