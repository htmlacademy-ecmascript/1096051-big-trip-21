import AbstractView from '../framework/view/abstract-view.js';

function createImageTemplate(url, name) {
  return `<img class="event__photo" src="${url}" alt="${name} photo"></img>`;
}

function createOfferTemplate({ text, price, id }) {
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" checked>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${text}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
}

function createDestinationOptionTemplate(destination) {
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

function createNewPointTemplate({ types, pointOffers, destinations }) {
  const firstDestination = destinations[0];
  const { description, photos, name } = firstDestination;
  const photosElements = photos
    .map((photo) => createImageTemplate(photo.src, name))
    .join('');
  return `
    <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${Object.values(types).map(createTypeItemTemplate).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinations.map(createDestinationOptionTemplate).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${pointOffers.map(createOfferTemplate).join('')}
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

export default class NewPointView extends AbstractView {
  #newPointData;

  constructor(newPointData) {
    super();
    this.#newPointData = newPointData;
  }

  get template() {
    return createNewPointTemplate(this.#newPointData);
  }
}