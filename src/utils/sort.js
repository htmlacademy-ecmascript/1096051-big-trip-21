import { SORTS } from '../const.js';
import { getTypeOffers } from '../mock/offers.js';
import { getTimeDiff } from './time.js';
import { getLocaleCompare } from './utils.js';

const Sorter = {
  [SORTS.EVENT.toLowerCase()]: sortByEvent,
  [SORTS.TIME.toLowerCase()]: sortByTime,
  [SORTS.PRICE.toLowerCase()]: sortByPrice,
  [SORTS.OFFERS.toLowerCase()]: sortByOffers,
  [SORTS.DAY.toLowerCase()]: sortByDay
};

function sortByDay(a, b) {
  const firstDate = a.startTime;
  const secondDate = b.startTime;

  return secondDate - firstDate;
}

function sortByEvent(a, b) {
  const firstDestinationName = String(a.destination.name);
  const secondDestinationName = String(b.destination.name);

  return getLocaleCompare(firstDestinationName, secondDestinationName);
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

function sortByOffers(a, b) {
  const firstOffersLength = getTypeOffers(a.type).length;
  const secondOffersLength = getTypeOffers(b.type).length;

  return secondOffersLength - firstOffersLength;
}

function sortPoints(points, sortType = 'day') {
  return points.sort(Sorter[sortType]);
}

export { sortPoints };
