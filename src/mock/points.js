import { getRandomArrayElement } from '../utils/utils.js';
import { POINT_TYPES, DESTNATIONS} from '../const.js';

const mockPoints = [
  {
    type: getRandomArrayElement(Object.values(POINT_TYPES)),
    destination: getRandomArrayElement(DESTNATIONS),
    startTime: new Date(2023, 9, 18, 10, 0, 0),
    endTime: new Date(2023, 9, 18, 11, 30, 0),
    isFavorite: false
  },
  {
    type: getRandomArrayElement(Object.values(POINT_TYPES)),
    destination: getRandomArrayElement(DESTNATIONS),
    startTime: new Date(2023, 9, 18, 11, 0, 0),
    endTime: new Date(2023, 9, 18, 12, 30, 0),
    isFavorite: false
  }
];


function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
