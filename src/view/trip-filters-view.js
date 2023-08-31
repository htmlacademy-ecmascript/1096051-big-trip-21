import AbstractView from '../framework/view/abstract-view.js';

const FILTERS = {
  ALL: 'All',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
};

function createFilterTemplate(filter) {
  const filterLower = filter.toLowerCase();
  return `
    <div class="trip-filters__item">
      <input id="filter-${filterLower}" class="trip-filters__item-input  visually-hidden" type="radio" name="trip-filter" value="${filterLower}" checked>
      <label class="trip-filters__label" for="filter-${filterLower}">${filterLower}</label>
    </div>
  `;
}

function createTripFiltersTemplate() {
  const filtersElements = Object.values(FILTERS).map(createFilterTemplate).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filtersElements}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}

export default class TripFiltersView extends AbstractView{
  get template() {
    return createTripFiltersTemplate();
  }
}
