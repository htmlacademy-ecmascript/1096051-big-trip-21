const RANDOM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const MIN_ELEMENTS = 3;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArrayElements(array) {
  let firstNumber = getRandomPositiveInteger(0, array.length);
  let secondNumber = getRandomPositiveInteger(0, array.length);
  let diff = Math.abs(secondNumber - firstNumber);

  while (diff < MIN_ELEMENTS) {
    firstNumber = getRandomPositiveInteger(0, array.length);
    secondNumber = getRandomPositiveInteger(0, array.length);
    diff = Math.abs(secondNumber - firstNumber);
  }

  const min = Math.min(firstNumber, secondNumber);
  const max = Math.max(firstNumber, secondNumber);

  return array.slice(min, max);
}

function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function generateRandomText() {
  const wordsList = RANDOM_TEXT.split(' ');
  return getRandomArrayElements(wordsList);
}

function getRandomBoolean() {
  return Boolean(Math.round(Math.random()));
}

function updateItem(points, update) {
  return points.map((point) => point.id === update.id ? update : point);
}

function getLocaleCompare(a, b) {
  return a.localeCompare(b);
}

export { getRandomArrayElement, getRandomPositiveInteger, generateRandomText, getRandomBoolean, updateItem, getLocaleCompare };
