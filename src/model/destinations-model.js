import { createRandomDestination } from '../mock/destinations.js';
import { DESTNATIONS } from '../const.js';

export default class DestinationsModel {
  #destinations = new Map();

  get destinations() {
    if (!this.#destinations.size) {
      this.#setDestinations();
    }
    return this.#destinations;
  }

  get names() {
    return DESTNATIONS;
  }

  getDestinationDataByName = (destinationName) => {
    if (this.destinations.has(destinationName)) {
      return this.destinations.get(destinationName);
    }

    return null;
  };

  #setDestinations() {
    for (let i = 0; i < DESTNATIONS.length; i++) {
      const randomDestination = createRandomDestination(DESTNATIONS[i]);
      this.#destinations.set(randomDestination.name, randomDestination);
    }
  }
}
