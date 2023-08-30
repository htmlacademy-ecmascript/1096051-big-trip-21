import { createRandomDestination } from '../mock/destinations.js';

const COUNT_DESTINATIONS = 5;

export default class DestinationsModel {
  get destinations() {
    return Array.from({length : COUNT_DESTINATIONS}, createRandomDestination);
  }

  get names() {
    return this.destinations.map((destination) => destination.name);
  }
}
