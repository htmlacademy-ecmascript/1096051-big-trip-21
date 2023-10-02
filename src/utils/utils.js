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

function getIsDisabled(isDisabled) {
  return isDisabled ? 'disabled' : '';
}

function parseArrayToMap(dataList, key) {
  const map = new Map();
  dataList.forEach((element) => {
    const id = element[key];
    map.set(id, element);
  });

  return map;
}

function omit(data, ...blacklistedKeys) {
  const result = { ...data };
  blacklistedKeys.forEach((key) => {
    delete result[key];
  });
  return result;
}

function setStatus(component, { isSaving = false, isDeleting = false, isDisabled = true }) {
  component.updateElement({isSaving, isDeleting, isDisabled});
}

export {
  getRandomPositiveInteger,
  capitalizeWord,
  setChecked,
  parseArrayToMap,
  omit,
  getIsDisabled,
  setStatus
};
