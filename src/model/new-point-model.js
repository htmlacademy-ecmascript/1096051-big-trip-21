import { POINT_TYPES, OFFERS, DESTNATIONS } from '../const.js';

export default class NewPointModel {
  type = POINT_TYPES.FLIGHT;
  pointOffers = OFFERS[this.type];
  randomDestination = DESTNATIONS[0];

  getData() {
    return {
      types: POINT_TYPES,
      destinations: DESTNATIONS,
      pointOffers: this.pointOffers
    };
  }
}
