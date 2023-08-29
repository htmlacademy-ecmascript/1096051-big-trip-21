import { POINT_TYPES, OFFERS, DESTNATIONS } from '../const.js';

export default class NewPointModel {
  get data() {
    const type = POINT_TYPES.FLIGHT;
    const pointOffers = OFFERS[type];

    return {
      types: POINT_TYPES,
      destinations: DESTNATIONS,
      pointOffers: pointOffers
    };
  }
}
