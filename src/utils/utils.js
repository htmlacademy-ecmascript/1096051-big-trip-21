function getRandomPositiveInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function setChecked(checkedElement, element) {
  return element.toLowerCase() === checkedElement ? 'checked' : '';
}

function parseArrayToMap(array, key) {
  const map = new Map();
  array.forEach((object) => {
    const id = object[key];
    map.set(id, object);
  });

  return map;
}

function omit(object, ...blacklistedKeys) {
  const result = { ...object };
  blacklistedKeys.forEach((key) => {
    delete result[key];
  });
  return result;
}

export {
  getRandomPositiveInteger,
  capitalizeWord,
  setChecked,
  parseArrayToMap,
  omit
};
