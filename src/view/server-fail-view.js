import AbstractView from '../framework/view/abstract-view.js';

function createServerFailTemplate() {
  return `
    <p class="trip-events__msg">
    Failed to load latest route information
    </p>
  `;
}

export default class ServerFailView extends AbstractView {
  get template() {
    return createServerFailTemplate();
  }
}
