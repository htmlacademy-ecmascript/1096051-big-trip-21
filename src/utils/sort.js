import { SORTS } from '../const.js';
import { getTimeDiff } from './time.js';

const Sorter = {
  [SORTS.TIME.title.toLowerCase()]: sortByTime,
  [SORTS.PRICE.title.toLowerCase()]: sortByPrice,
  [SORTS.DAY.title.toLowerCase()]: sortByDay
};

function sortByDay(a, b) {
  const firstDate = a.startTime;
  const secondDate = b.startTime;

  return secondDate - firstDate;
}

function sortByTime(a, b) {
  const firstDuration = getTimeDiff(a.startTime, a.endTime);
  const secondDuration = getTimeDiff(b.startTime, b.endTime);

  return secondDuration - firstDuration;
}

function sortByPrice(a, b) {
  const firstPrice = a.price;
  const secondPrice = b.price;

  return secondPrice - firstPrice;
}

function sortPoints(points, sortType = 'day') {
  if (Sorter[sortType]) {
    return points.sort(Sorter[sortType]);
  }
}

export { sortPoints };
