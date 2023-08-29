import AbstractView from '../framework/view/abstract-view.js';

const FILTERS = {
  EVERYTHIG: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
};

function createFilterTemplate(filter) {
  return `
    <div class="trip-filters__filter">
      <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" checked>
      <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter.toUpperCase()}</label>
    </div>
  `;
}

function createTripFiltersTemplate() {
  const filtersElements = Object.values(FILTERS).map((filter) => createFilterTemplate(filter)).join('');

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
