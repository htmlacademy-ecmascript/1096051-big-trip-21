import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';
import PointsApiService from '../points-api-service.js';
import { parseArrayToMap } from '../utils/utils.js';
export default class PointsModel extends Observable {
  #points = [];
  #destinations = null;
  #offers = null;
  #types = null;
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get types() {
    const types = [];
    this.#offers.forEach((value, key) => types.push(key));
    return types;
  }

  async init() {
    try {
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = parseArrayToMap(destinations, 'id');

      const offers = await this.#pointsApiService.offers;
      this.#offers = this.#parseOffersToMap(offers);

      const points = await this.#pointsApiService.points;
      this.#points = points.map((point) => this.#adaptToClient(point, this.#getPointDestination(point), this.#getPointOffers(point)));
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  #getPointDestination(point) {
    return this.#destinations.get(point.destination);
  }

  #getPointOffers(point) {
    const offersByType = this.#offers.get(point.type);
    return point.offers.map((id) => offersByType.get(id));
  }

  #parseOffersToMap(offers) {
    const offersMap = parseArrayToMap(offers, 'type');
    offersMap.forEach((value, key) => {
      offersMap.set(key, parseArrayToMap(value.offers, 'id'));
    });

    return offersMap;
  }

  async updatePoint(updateType, update) {
    const index = this.#getPointIndex(update);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point.');
    }

    try {
      const point = await this.#pointsApiService.updatePoint(update);
      const updatePoint = this.#adaptToClient(point, this.#getPointDestination(point), this.#getPointOffers(point));

      this.#points = [
        ...this.#points.slice(0, index),
        updatePoint,
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  deletePoint(updateType, update) {
    const index = this.#getPointIndex(update);

    if (index === -1) {
      throw new Error('Can\'t delete unexistig point.');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  }

  #getPointIndex(update) {
    return this.#points.findIndex((point) => point.id === update.id);
  }

  #getAdaptedDestination(destination) {
    destination = {...destination,
      photos: destination.pictures
    };
    delete destination.pictures;

    return destination;
  }

  #getAdaptedOffers(offers) {
    offers = offers.map((offer) => {
      offer = {...offer,
        text: offer.title
      };
      delete offer.title;

      return offer;
    });

    return offers;
  }

  #adaptToClient(point, destination, offers) {
    destination = this.#getAdaptedDestination(destination);
    offers = this.#getAdaptedOffers(offers);

    const adaptedPoint = {...point,
      offers,
      destination,
      price: point['base_price'],
      startTime: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      endTime: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
