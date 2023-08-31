import { getRandomArrayElement, getRandomBoolean, getRandomPositiveInteger} from '../utils/utils.js';
import { POINT_TYPES } from '../const.js';
import { getRandomDate } from '../utils/time.js';

const PRICE = {
  MIN: 1,
  MAX: 2000
};
const HOURS_INCREMENT = {
  MIN: 1,
  MAX: 10
};
const MINUTES_INCREMENT = {
  MIN: 1,
  MAX: 60
};

function setEndTime(startTime) {
  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + getRandomPositiveInteger(HOURS_INCREMENT.MIN, HOURS_INCREMENT.MAX));
  endTime.setMinutes(startTime.getMinutes() + getRandomPositiveInteger(MINUTES_INCREMENT.MIN, MINUTES_INCREMENT.MAX));

  return endTime;
}

function createRandomPoint(destinations) {
  const startTime = getRandomDate();
  const endTime = setEndTime(startTime);

  return {
    type: getRandomArrayElement(Object.values(POINT_TYPES)),
    destination: getRandomArrayElement(destinations),
    startTime,
    endTime,
    isFavorite: getRandomBoolean(),
    price: getRandomPositiveInteger(PRICE.MIN, PRICE.MAX)
  };
}

export {createRandomPoint};
