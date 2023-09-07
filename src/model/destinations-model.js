import { createRandomDestination } from '../mock/destinations.js';
import { DESTNATIONS } from '../const.js';

export default class DestinationsModel {
  #destinations = new Map();

  get destinations() {
    for (let i = 0; i < DESTNATIONS.length; i++) {
      const randomDestination = createRandomDestination(DESTNATIONS[i]);
      this.#destinations.set(randomDestination.name, randomDestination);
    }
    return this.#destinations;
  }

  get names() {
    return DESTNATIONS;
  }
}
