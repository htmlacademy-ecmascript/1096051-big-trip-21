import { POINT_TYPES, OFFERS } from '../const.js';

export default class NewPointModel {
  #destinations;

  constructor(destination) {
    this.#destinations = destination;
  }

  get data() {
    const type = POINT_TYPES.FLIGHT;
    const pointOffers = OFFERS[type];

    return {
      types: POINT_TYPES,
      destinations: this.#destinations,
      pointOffers: pointOffers
    };
  }
}
