import { createElement } from '../render.js';
import { getHumanizeEventTime, getFormattedTime} from '../utils.js';
import { OFFERS } from '../const.js';

function isActiveFavorite(isFavorite) {
  return isFavorite ? 'event__favorite-btn--active' : '';
}

function createOfferTemplate(offer) {
  const {text, price} = offer;

  return `
    <li class="event__offer">
      <span class="event__offer-title">${text}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `;
}

function getDurationFormatTime (minutes, hours, days) {
  let text = '';
  if (days) {
    text += `${getFormattedTime(days)}D `;
  }

  if (hours) {
    text += `${getFormattedTime(hours)}H `;
  }

  text += `${getFormattedTime(minutes)}M`;

  return text;
}

function getDurationText(startTime, endTime) {
  const seconds = (endTime - startTime) / 1000;
  let minutes = seconds / 60;
  let hours;
  let days;

  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes %= 60;
  }
  if (hours >= 24) {
    days = Math.floor(hours / 24);
    hours %= 24;
  }

  return getDurationFormatTime(minutes, hours, days);
}

function createTripItemTemplate(point) {
  const {
    type,
    destination,
    startTime,
    endTime,
    isFavorite
  } = point;
  const duration = getDurationText(startTime, endTime);
  const offers = OFFERS[type];

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${getHumanizeEventTime(startTime, 'DATE')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getHumanizeEventTime(startTime, 'TIME')}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${getHumanizeEventTime(endTime, 'TIME')}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">20</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((offer) => createOfferTemplate(offer)).join('')}
        </ul>
        <button class="event__favorite-btn ${isActiveFavorite(isFavorite)}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
}

export default class TripItemView {
  constructor({point}) {
    this.point = point;
  }

  getTemplate() {
    return createTripItemTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
