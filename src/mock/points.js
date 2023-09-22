import { getRandomArrayElement, getRandomBoolean, getRandomPositiveInteger} from '../utils/utils.js';
import { POINT_TYPES } from '../const.js';
import { getRandomDate, setEndTime } from '../utils/time.js';
import { nanoid } from 'nanoid';
import { DESTNATIONS } from '../const.js';

const PRICE = {
  MIN: 1,
  MAX: 2000
};

function createRandomPoint(destinations) {
  const startTime = getRandomDate();
  const endTime = setEndTime(startTime);

  return {
    id: nanoid(),
    type: getRandomArrayElement(Object.values(POINT_TYPES)),
    destination: destinations.get(getRandomArrayElement(DESTNATIONS)),
    startTime,
    endTime,
    isFavorite: getRandomBoolean(),
    price: getRandomPositiveInteger(PRICE.MIN, PRICE.MAX)
  };
}

export {createRandomPoint};
