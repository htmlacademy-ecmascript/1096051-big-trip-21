import { getRandomPhotos } from '../utils/photos.js';
import { generateRandomText } from '../utils/utils.js';

const MAX_PHOTOS = 5;

function createRandomDestination(destination) {
  return {
    name: destination,
    description: generateRandomText(),
    photos: getRandomPhotos(MAX_PHOTOS),
  };
}

export { createRandomDestination };
