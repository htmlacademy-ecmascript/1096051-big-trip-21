import { createRandomPoint } from '../mock/points.js';

const POINTS_COUNT = 10;
export default class PointsModel {
  #points = null;

  constructor(destinations) {
    this.#points = Array.from({length: POINTS_COUNT}, () => createRandomPoint(destinations));
  }

  get points() {
    return this.#points;
  }
}
