import { DESTNATIONS } from '../const.js';

function getDestinationsNames() {
  return DESTNATIONS.map((data) => data.name);
}

export {getDestinationsNames};
