import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';
import { omit } from '../utils/utils.js';
export default class PointsModel extends Observable {
  #points = [];
  #destinationsModel = null;
  #offersModel = null;
  #pointsApiService = null;

  constructor({ pointsApiService, destinationsModel, offersModel }) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await this.#offersModel.init();
      await this.#destinationsModel.init();

      const points = await this.#pointsApiService.points;
      this.#points = points.map((point) =>
        this.#adaptToClient(
          point,
          this.#destinationsModel.getPointDestination(point),
          this.#offersModel.getPointOffers(point)
        )
      );
      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#points = [];
      this._notify(UpdateType.ERROR);
      throw new Error('Failed to load latest route information');
    }
  }

  async updatePoint(updateType, update) {
    const index = this.#getPointIndex(update);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point.');
    }

    try {
      const point = await this.#pointsApiService.updatePoint(update);
      const updatePoint = this.#adaptToClient(
        point,
        this.#destinationsModel.getPointDestination(point),
        this.#offersModel.getPointOffers(point)
      );

      this.#points = [
        ...this.#points.slice(0, index),
        updatePoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatePoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#getPointIndex(update);

    if (index === -1) {
      throw new Error('Can\'t delete unexistig point.');
    }

    try {
      await this.#pointsApiService.deletePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const point = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(
        point,
        this.#destinationsModel.getPointDestination(point),
        this.#offersModel.getPointOffers(point)
      );

      this.#points = [newPoint, ...this.#points];

      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  #getPointIndex(update) {
    return this.#points.findIndex((point) => point.id === update.id);
  }

  #adaptToClient(point, destination, offers) {
    destination = this.#destinationsModel.getAdaptedDestination(destination);
    offers = this.#offersModel.getAdaptedOffers(offers);

    const adaptedPoint = {
      ...point,
      offers,
      destination,
      price: point['base_price'],
      startTime:
        point['date_from'] !== null
          ? new Date(point['date_from'])
          : point['date_from'],
      endTime:
        point['date_to'] !== null
          ? new Date(point['date_to'])
          : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    const updatePoint = omit(adaptedPoint, 'base_price', 'date_from', 'date_to', 'is_favorite');
    return updatePoint;
  }
}
