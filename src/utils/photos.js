import { nanoid } from 'nanoid';
import { getRandomPositiveInteger } from './utils.js';

function createRandomPhotoUrl() {
  return `https://loremflickr.com/248/152?random=${nanoid()}`;
}

function getRandomPhotos (count) {
  return Array.from({length: getRandomPositiveInteger(0, count)}, createRandomPhotoUrl);
}

export { getRandomPhotos };
