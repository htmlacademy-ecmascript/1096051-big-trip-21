import { getRandomArrayElement, getRandomPositiveInteger} from '../utils/utils.js';
import { POINT_TYPES, DESTNATIONS} from '../const.js';

const TIME = {
  MAX_MONTHS: 12,
  MAX_DAYS: 30,
  MAX_HOURS: 24,
  MAX_MINUTES: 60,
  MAX_SECONDS: 60,
};
const MAX_PRICE = 2000;


function createRandomPoint() {
  const month = getRandomPositiveInteger(1, TIME.MAX_MONTHS);
  const day = getRandomPositiveInteger(1, TIME.MAX_DAYS);
  const hour = getRandomPositiveInteger(1, TIME.MAX_HOURS);
  const minute = getRandomPositiveInteger(1, TIME.MAX_MINUTES);
  const second = getRandomPositiveInteger(1, TIME.MAX_SECONDS);

  return {
    type: getRandomArrayElement(Object.values(POINT_TYPES)),
    destination: getRandomArrayElement(DESTNATIONS),
    startTime: new Date(
      2023,
      month,
      day,
      hour,
      minute,
      second
    ),
    endTime: new Date(
      2023,
      month,
      day,
      hour + getRandomPositiveInteger(1, 10),
      minute + getRandomPositiveInteger(1, 10),
      second
    ),
    isFavorite: Boolean(Math.round(Math.random())),
    price: getRandomPositiveInteger(1, MAX_PRICE)
  };
}

export {createRandomPoint};
