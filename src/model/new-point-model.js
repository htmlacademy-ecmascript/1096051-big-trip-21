import { POINT_TYPES, OFFERS, DESTNATIONS } from '../const.js';

export default class NewPointModel {
  getData() {
    return {
      types: POINT_TYPES,
      destinations: DESTNATIONS,
      offers: OFFERS
    };
  }
}
