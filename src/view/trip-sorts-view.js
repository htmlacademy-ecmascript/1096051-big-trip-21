import AbstractView from '../framework/view/abstract-view.js';
import { SORTS } from '../const.js';

function setChecked(sort) {
  return sort === SORTS.DAY ? 'checked' : '';
}

function createSortTemplate(sort) {
  const sortLower = sort.toLowerCase();
  return `
    <div class="trip-sort__item  trip-sort__item--${sortLower}">
      <input id="sort-${sortLower}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortLower}" data-sort-type="${sortLower}" ${setChecked(sort)}>
      <label class="trip-sort__btn" for="sort-${sortLower}">${sort}</label>
    </div>
  `;
}

function createTripSortsTemplate() {
  const sortsElements = Object.values(SORTS).map(createSortTemplate).join('');
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortsElements}
    </form>
  `;
}

export default class TripSortsView extends AbstractView{
  #handleSortChange = null;

  constructor({ onSortChange }) {
    super();
    this.#handleSortChange = onSortChange;

    this.element
      .addEventListener('change', this.#handlerSortChange);
  }

  get template() {
    return createTripSortsTemplate();
  }

  #handlerSortChange = (evt) => {
    const checkedSortElement = this.element.querySelector('[checked]');
    const selectedSortElement = evt.target;

    evt.preventDefault();
    if (checkedSortElement === selectedSortElement) {
      return;
    }
    checkedSortElement.removeAttribute('checked');
    selectedSortElement.setAttribute('checked', 'true');


    this.#handleSortChange(selectedSortElement.dataset.sortType);
  };
}
