import { getHumanizeEventTime, getRandomDate, setEndTime } from '../utils/time.js';
import { capitalizeWord } from '../utils/utils.js';
import he from 'he';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import DatepickerAbstract from './datepicker-abstract.js';
import { DATE_TYPE } from '../const.js';
import { nanoid } from 'nanoid';

const START_TIME = getRandomDate();
const BLANK_POINT = {
  type: 'Bus',
  destination: {
    name: 'Moscow',
    description: 'description',
    photos: [
      {
        src: `https://loremflickr.com/248/152?random=${nanoid()}`,
        description: 'description'
      }
    ],
  },
  startTime: START_TIME,
  endTime: setEndTime(START_TIME),
  isFavorite: false,
  price: 100,
};

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

function createArrowTemplate() {
  return `
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
  `;
}

function createTripItemEditTemplate(point, names, isNewPoint, types) {
  const {
    destination,
    type,
    startTime,
    endTime,
    price,
    offers
  } = point;
  const {name, description, photos} = destination;
  const offersElements = offers.map(createOfferTemplate).join('');
  const typesElements = types.map(createTypeItemTemplate).join('');
  const destionationsElements = names.map(createDestinationTemplate).join('');
  const photosElements = photos.map((photo) => createPhotoTemplate(photo.src)).join('');

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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(name)}" list="destination-list-1">
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
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(String(price))}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          ${isNewPoint ? '' : createArrowTemplate()}
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
  #types = null;

  #handleFormSubmit = null;
  #handleButtonClick = null;
  #handleDeleteClick = null;
  #getDestinationDataByName = null;

  #isNewPoint = null;
  #startDatepicker = null;
  #endDatepicker = null;

  constructor({ point = BLANK_POINT, destinationsNames, onFormSubmit, onArrowClick, getDestinationDataByName, onDeleteClick, isNewPoint = false, types }) {
    super();
    this.#point = point;
    this.#destinationsNames = destinationsNames;
    this.#types = types;
    this.#isNewPoint = isNewPoint;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonClick = onArrowClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#getDestinationDataByName = getDestinationDataByName;

    if (isNewPoint) {
      this.#point.id = nanoid();
    }

    this.#startDatepicker = new DatepickerAbstract({ onDateChange: this.#dateChangeHandler });
    this.#endDatepicker = new DatepickerAbstract({ onDateChange: this.#dateChangeHandler });

    this._setState(TripItemEditView.parsePointToStatic(this.#point));
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    this.#startDatepicker.removeElement();
    this.#endDatepicker.removeElement();
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#submitFormHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('#event-destination-1')
      .addEventListener('input', this.#destinationChangeHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('#event-price-1')
      .addEventListener('change', this.#priceChangeHandler);
    if (!this.#isNewPoint) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#arrowButtonClickHandler);
    }

    this.#startDatepicker.createCalendar(
      this._state,
      this.element.querySelector('#event-start-time-1'),
      DATE_TYPE.START
    );
    this.#endDatepicker.createCalendar(
      this._state,
      this.element.querySelector('#event-end-time-1'),
      DATE_TYPE.END
    );
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(TripItemEditView.parseStateToPoint(this._state));
  };

  #arrowButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({...this.#point});
    this.#handleButtonClick();
  };

  #typeChangeHandler = (evt) => {
    const newType = capitalizeWord(evt.target.value);

    evt.preventDefault();
    this.updateElement({...this.#point, type: newType});
  };

  #dateChangeHandler = (evt, isStartTime) => {
    this.updateElement({...this._state, [isStartTime ? 'startTime' : 'endTime']: new Date(evt)});
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(TripItemEditView.parseStateToPoint(this._state));
  };

  #destinationChangeHandler = (evt) => {
    const destinationName = evt.target.value;
    const destinationData = this.#getDestinationDataByName(destinationName);

    evt.preventDefault();

    if (destinationData !== null) {
      this.updateElement({...this.#point, destination: destinationData});
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    this._setState({price: Number(evt.target.value)});
  };

  get template() {
    return createTripItemEditTemplate(this._state, this.#destinationsNames, this.#isNewPoint, this.#types);
  }

  static parseStateToPoint(state) {// todo убрать метод, если расширение не потребует.
    return {...state};
  }

  static parsePointToStatic(point) {// todo убрать метод, если расширение не потребует.
    return {...point};
  }
}
