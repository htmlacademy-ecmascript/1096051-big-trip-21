import { parseArrayToMap } from '../utils/utils';

export default class DestinationsModel {
  #destinations = null;

  #pointsApiService = null;

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    const destinations = await this.#pointsApiService.destinations;
    this.#destinations = parseArrayToMap(destinations, 'id');
  }

  get destinations() {
    return this.#destinations;
  }

  getPointDestination(point) {
    return this.#destinations.get(point.destination);
  }

  getAdaptedDestination(destination) {
    destination = { ...destination, photos: destination.pictures };
    delete destination.pictures;

    return destination;
  }
}
