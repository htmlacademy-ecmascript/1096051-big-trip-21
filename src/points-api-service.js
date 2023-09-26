import ApiService from './framework/api-service.js';
import { omit } from './utils/utils.js';

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: 'PUT',
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: 'POST',
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      type: point.type.toLowerCase(),
      destination: point.destination.id,
      offers: point.offers.map((offer) => offer.id),
      'base_price': point.price,
      'date_from':
        point.startTime instanceof Date ? point.startTime.toISOString() : null,
      'date_to':
        point.endTime instanceof Date ? point.endTime.toISOString() : null,
      'is_favorite': point.isFavorite,
    };

    const updatePoint = omit(adaptedPoint, 'price', 'startTime', 'endTime', 'isFavorite');
    return updatePoint;
  }
}
