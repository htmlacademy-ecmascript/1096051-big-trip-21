import { omit, parseArrayToMap } from '../utils/utils';

export default class OffersModel {
  #offers = null;
  #types = [];

  #pointsApiService = null;

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  get types() {
    return this.#types;
  }

  async init() {
    const offers = await this.#pointsApiService.offers;
    this.#offers = this.#parseOffersToMap(offers);
    this.#setTypes();
  }

  getPointOffers(point) {
    const offersByType = this.#offers.get(point.type);
    return point.offers.map((id) => offersByType.get(id));
  }

  getOffersByType = (type) => {
    const offersByType = Array.from(this.#offers.get(type).values());
    offersByType.map(({title: text, ...offerData}) => ({...offerData, text}));

    return offersByType;
  };

  getAdaptedOffers(offers) {
    offers.map(({title: text, ...offer}) => ({...offer, text}));
    return offers;
  }

  #parseOffersToMap(offers) {
    const offersMap = parseArrayToMap(offers, 'type');
    offersMap.forEach((value, key) => {
      offersMap.set(key, parseArrayToMap(value.offers, 'id'));
    });

    return offersMap;
  }

  #setTypes() {
    this.#offers.forEach((value, key) => this.#types.push(key));
  }
}
