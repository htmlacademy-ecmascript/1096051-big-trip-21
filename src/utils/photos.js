import { getRandomPositiveInteger } from './utils.js';

function createRandomPhotoUrl() {
  return `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`;
}

function getRandomPhotos (count) {
  Array.from({length: getRandomPositiveInteger(0, count)}, createRandomPhotoUrl);
}

export { getRandomPhotos };
