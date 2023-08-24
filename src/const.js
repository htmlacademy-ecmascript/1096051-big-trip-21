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
  [POINT_TYPES.DRIVE]: [
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
  {
    name: 'Geneva',
    description: 'finibus eget, sollicitudin eget ante. Phasellus eros mauris',
    photos: ['https://loremflickr.com/248/152?random=3']
  },
  {
    name: 'Moscow',
    description: 'ipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac ',
    photos: ['https://loremflickr.com/248/152?random=4']
  },
  {
    name: 'Los Angeles',
    description: 'condimentum sed nibh vitae',
    photos: ['https://loremflickr.com/248/152?random=5']
  },
  {
    name: 'California',
    description: 'In rutrum ac purus sit amet tempus',
    photos: ['https://loremflickr.com/248/152?random=6']
  },
  {
    name: 'Mexico',
    description: 'consectetur adipiscing elit',
    photos: ['https://loremflickr.com/248/152?random=7']
  },
  {
    name: 'Paris',
    description: 'lectus varius viverra. Nullam nunc ex, convallis',
    photos: ['https://loremflickr.com/248/152?random=8']
  }
];

export {POINT_TYPES, OFFERS, DESTNATIONS};
