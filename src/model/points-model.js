import { createRandomPoint } from '../mock/points.js';

const POINTS_COUNT = 10;

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, createRandomPoint);

  get points() {
    return this.#points;
  }
}
