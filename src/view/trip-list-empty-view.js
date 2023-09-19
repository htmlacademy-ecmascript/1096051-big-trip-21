import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const EmptyListTextType = {
  [FilterType.ALL]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now'
};

function createListEmptyTemplate(filterType) {
  return `
    <p class="trip-events__msg">
      ${EmptyListTextType[filterType]}
    </p>
  `;
}

export default class TripListEmptyView extends AbstractView{
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return (createListEmptyTemplate(this.#filterType));
  }
}
