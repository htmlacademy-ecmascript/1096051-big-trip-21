import { FilterType } from '../const.js';

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) =>
    points.filter((point) => Date.now() < point.startTime),
  [FilterType.PRESENT]: (points) =>
    points.filter(
      (point) => Date.now() >= point.startTime && Date.now() <= point.endTime
    ),
  [FilterType.PAST]: (points) =>
    points.filter((point) => Date.now() > point.endTime),
};

export { filter };
