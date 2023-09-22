import Observable from '../framework/observable.js';
import { createRandomPoint } from '../mock/points.js';

const POINTS_COUNT = 10;
export default class PointsModel extends Observable {
  #points = null;

  constructor(destinations) {
    super();
    this.#points = Array.from({length: POINTS_COUNT}, () => createRandomPoint(destinations));
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#getPointIndex(update);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point.');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
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
}
