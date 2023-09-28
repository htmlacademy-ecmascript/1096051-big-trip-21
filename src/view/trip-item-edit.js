import {
  getHumanizeEventTime,
  getRandomDate,
  setEndTime,
} from '../utils/time.js';
import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import DatepickerAbstract from './datepicker-abstract.js';
import { DATE_TYPE } from '../const.js';
import { omit, parseArrayToMap } from '../utils/utils.js';

const START_TIME = getRandomDate();
const BLANK_POINT = {
  type: 'flight',
  startTime: START_TIME,
  endTime: setEndTime(START_TIME),
  isFavorite: false,
  price: 0,
};

function getTextDeleteButton(isNewPoint, isDeleting) {
  if (isNewPoint) {
    return 'Cancel';
  }

  return isDeleting ? 'Deleting...' : 'Delete';
}

function createPhotoTemplate(photoURL) {
  return `<img class="event__photo" src="${photoURL}" alt="Event photo"></img>`;
}

function createDestinationTemplate(destination, currentDestination) {
  return `<option value="${destination}" ${destination === currentDestination ? 'selected' : ''}>${destination}</option>`;
}

function createTypeItemTemplate(type) {
  const typeLower = type.toLowerCase();
  return `
    <div class="event__type-item">
      <input id="event-type-${typeLower}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeLower}">
      <label class="event__type-label  event__type-label--${typeLower}" for="event-type-${typeLower}-1">${type}</label>
    </div>`;
}

function createOfferTemplate({ id, text, price }, activeOffers) {
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" type="checkbox" id="${id}" ${activeOffers.find((offer) => offer.text === text) ? 'checked' : ''}>
      <label class="event__offer-label" for="${id}">
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

function getPhotosElements(photos) {
  if (!photos) {
    return '';
  }

  return photos
    .map((photo) => createPhotoTemplate(photo.src))
    .join('');
}

function getDescription(description) {
  if (!description) {
    return '';
  }

  return description;
}

function getDestinationElements(names, currentName) {
  if (!currentName) {
    return `
    <option value="none" selected>--Chose destination--</option>
    ${names.map((element) => createDestinationTemplate(element)).join('')}
    `;
  }

  return names.map((element) => createDestinationTemplate(element, currentName)).join('');
}

function createTripItemEditTemplate(point, names, isNewPoint, types, allOffersByType) {
  const { destination, type, startTime, endTime, price, offers, isDeleting, isDisabled, isSaving } = point;

  const typesElements = types.map(createTypeItemTemplate).join('');
  const description = getDescription(destination.description);
  const photosElements = getPhotosElements(destination.photos);
  const destionationsElements = getDestinationElements(names, destination.name);
  const offersElements = allOffersByType.map((element) => createOfferTemplate(element, offers)).join('');

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
            <select class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" ${isDisabled ? 'disabled' : ''} required>
              ${destionationsElements}
            </select>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getHumanizeEventTime(startTime,'FORM')}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getHumanizeEventTime(endTime,'FORM')}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value="${he.encode(String(price))}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${getTextDeleteButton(isNewPoint, isDeleting)}</button>
          ${isNewPoint ? '' : createArrowTemplate()}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers ${allOffersByType.length === 0 ? 'visually-hidden' : ''}">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <fieldset class="event__available-offers" ${isDisabled ? 'disabled' : ''}>
              ${offersElements}
            </fieldset>
          </section>

          <section class="event__section  event__section--destination ${description && photosElements ? '' : 'visually-hidden'}">
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

export default class TripItemEditView extends AbstractStatefulView {
  #point = null;
  #destinationsNames = null;
  #types = null;

  #handleFormSubmit = null;
  #handleButtonClick = null;
  #handleDeleteClick = null;
  #getDestinationDataByName = null;
  #getOffersByType = null;

  #isNewPoint = null;
  #startDatepicker = null;
  #endDatepicker = null;

  constructor({
    point = BLANK_POINT,
    destinationsNames,
    onFormSubmit,
    onArrowClick,
    getDestinationDataByName,
    onDeleteClick,
    isNewPoint = false,
    types,
    getOffersByType,
  }) {
    super();
    this.#point = point;
    this.#destinationsNames = destinationsNames;
    this.#types = types;
    this.#isNewPoint = isNewPoint;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonClick = onArrowClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#getDestinationDataByName = getDestinationDataByName;
    this.#getOffersByType = getOffersByType;

    if(isNewPoint) {
      this.#updatePropertiesForNewPoint();
    }

    this.#startDatepicker = new DatepickerAbstract({
      onDateChange: this.#dateChangeHandler,
    });
    this.#endDatepicker = new DatepickerAbstract({
      onDateChange: this.#dateChangeHandler,
    });

    this._setState(TripItemEditView.parsePointToState(this.#point));
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    this.#startDatepicker.removeElement();
    this.#endDatepicker.removeElement();
  }

  _restoreHandlers() {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submitFormHandler);
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element
      .querySelector('#event-destination-1')
      .addEventListener('input', this.#destinationChangeHandler);
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
    this.element
      .querySelector('#event-price-1')
      .addEventListener('change', this.#priceChangeHandler);
    this.element
      .querySelector('.event__available-offers')
      .addEventListener('change', this.#offersChangeHandler);
    if (!this.#isNewPoint) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#arrowButtonClickHandler);
    } else {
      this.#updatePropertiesForNewPoint();
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

  #updatePropertiesForNewPoint() {
    if (this.#isNewPoint) {
      this.#point.destination = {
        description: '',
        photos: [],
        name: ''
      };
    }
    this.#point.offers = [];
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    const selectDestinationsElement = evt.target.querySelector('#event-destination-1');

    if (selectDestinationsElement.value === 'none') {
      selectDestinationsElement.classList.add('event__input--invalid');
      return;
    }

    if (this._state.price > 0) {
      this.#handleFormSubmit(TripItemEditView.parseStateToPoint(this._state));
    }
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(TripItemEditView.parseStateToPoint(this._state));
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const currentOfferId = evt.target.id;
    const offersMap = parseArrayToMap(this.#getOffersByType(this._state.type), 'id');
    const changedOfferData = offersMap.get(currentOfferId);
    let offersArray = [...this._state.offers];

    if (!evt.target.checked) {
      offersArray = offersArray.filter((offer) => offer.id !== currentOfferId);
    } else {
      offersArray.push(changedOfferData);
    }

    this.updateElement({
      ...this._state,
      offers: offersArray
    });
  };

  #arrowButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({ ...this.#point });
    this.#handleButtonClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    const newType = evt.target.value;
    this.updateElement({
      ...this._state,
      type: newType,
      offers: []
    });
  };

  #dateChangeHandler = (evt, isStartTime) => {
    this.updateElement({
      ...this._state,
      [isStartTime ? 'startTime' : 'endTime']: new Date(evt),
    });
  };

  #destinationChangeHandler = (evt) => {
    const destinationName = evt.target.value;
    const destinationData = this.#getDestinationDataByName(destinationName);

    evt.preventDefault();

    if (destinationData !== null) {
      this.updateElement({ ...this.#point, destination: destinationData });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    this._setState({ price: Number(evt.target.value) });
  };

  get template() {
    return createTripItemEditTemplate(
      this._state,
      this.#destinationsNames,
      this.#isNewPoint,
      this.#types,
      this.#getOffersByType(this._state.type)
    );
  }

  static parseStateToPoint(state) {
    return omit(state, 'isDeleting', 'isSaving', 'isDisabled');
  }

  static parsePointToState(point) {
    return { ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }
}
