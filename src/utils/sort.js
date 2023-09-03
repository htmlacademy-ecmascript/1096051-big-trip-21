import { SORTS } from '../const.js';
import { getTypeOffers } from '../mock/offers.js';
import { getDiffTime } from './time.js';

function sortByDay(a, b) {
  const firstDate = a.startTime;
  const secondDate = b.startTime;

  return secondDate - firstDate;
}

function sortByEvent(a, b) {
  const firstDestinationNameLength = a.destination.name.length;
  const secondDestinationNameLength = b.destination.name.length;

  return firstDestinationNameLength - secondDestinationNameLength;
}

function sortByTime(a, b) {
  const firstDuration = getDiffTime(a.startTime, a.endTime);
  const secondDuration = getDiffTime(b.startTime, b.endTime);

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
  let sortedPoints = points;
  switch(sortType) {
    case SORTS.EVENT.toLowerCase():
      sortedPoints = points.sort(sortByEvent);
      break;
    case SORTS.TIME.toLowerCase():
      sortedPoints = points.sort(sortByTime);
      break;
    case SORTS.PRICE.toLowerCase():
      sortedPoints = points.sort(sortByPrice);
      break;
    case SORTS.OFFERS.toLowerCase():
      sortedPoints = points.sort(sortByOffers);
      break;
    default:
      sortedPoints = points.sort(sortByDay);
      break;
  }

  return sortedPoints;
}

export { sortPoints };
