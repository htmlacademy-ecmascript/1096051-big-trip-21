import { DESTNATIONS } from '../const.js';
import { getRandomPhotos } from '../utils/photos.js';
import { generateRandomText, getRandomArrayElement } from '../utils/utils.js';

const MAX_PHOTOS = 5;

function createRandomDestination() {
  return {
    name: getRandomArrayElement(DESTNATIONS),
    description: generateRandomText(),
    photos: getRandomPhotos(MAX_PHOTOS),
  };
}

export { createRandomDestination };
