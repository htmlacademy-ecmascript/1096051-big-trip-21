const POINT_TYPES = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECKIN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant'
};

const OFFERS = {
  [POINT_TYPES.TAXI]: [
    {
      id: 'uber',
      text: 'Order Uber',
      price: 20,
    }
  ],
  [POINT_TYPES.BUS]: [
    {
      id: 'seats',
      text: 'Choose seats',
      price: 5,
    }
  ],
  [POINT_TYPES.TRAIN]: [
    {
      id: 'cupe',
      text: 'Choose cupe',
      price: 50,
    },
    {
      id: 'meal',
      text: 'Add meal',
      price: 15,
    }
  ],
  [POINT_TYPES.SHIP]: [
    {
      id: 'meal',
      text: 'Add meal',
      price: 20,
    }
  ],
  [POINT_TYPES.DRIVE]: [
    {
      id: 'comfort-class',
      text: 'Switch to comfort class',
      price: 100,
    }
  ],
  [POINT_TYPES.FLIGHT]: [
    {
      id: 'comfort-class',
      text: 'Switch to comfort class',
      price: 120,
    },
    {
      id: 'meal',
      text: 'Add meal',
      price: 15,
    }
  ],
  [POINT_TYPES.CHECKIN]: [],
  [POINT_TYPES.SIGHTSEEING]: [
    {
      id: 'view',
      text: 'Beatiful view',
      price: 40,
    }
  ],
  [POINT_TYPES.RESTAURANT]: [
    {
      id: 'view',
      text: 'Beatiful view',
      price: 15,
    },
    {
      id: 'meal',
      text: 'Add meal',
      price: 15,
    },
    {
      id: 'seats',
      text: 'Choose seats',
      price: 5,
    }
  ],
};

const DESTNATIONS = [
  'Geneva',
  'Moscow',
  'Los Angeles',
  'California',
  'Mexico',
  'Paris',
];

const Mod = {
  DEFAULT: 'default',
  EDIT: 'edit'
};

export {POINT_TYPES, OFFERS, DESTNATIONS, Mod };
