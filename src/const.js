const Mod = {
  DEFAULT: 'default',
  EDIT: 'edit',
};

const SORTS = {
  DAY: {
    title: 'Day',
    isDisabled: false,
  },
  EVENT: {
    title: 'Event',
    isDisabled: true,
  },
  TIME: {
    title: 'Time',
    isDisabled: false,
  },
  PRICE: {
    title: 'Price',
    isDisabled: false,
  },
  OFFERS: {
    title: 'Offers',
    isDisabled: true,
  },
};

const DATE_TYPE = {
  START: 'START',
  END: 'END',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELTE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export { Mod, SORTS, DATE_TYPE, UserAction, UpdateType, FilterType };
