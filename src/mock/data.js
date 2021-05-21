import { FilterTypes, NavParameters } from '../const';
import { getRandomValue } from '../utils/common';
import { generateWaypoint, generateImages } from './waypoint';

export const types = ['check-in', 'sightseeing', 'restaurant',
  'taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight'];

export const cities = ['Madrid', 'London', 'Paris', 'Rome'];

export const offerList = [
  {
    'type': 'check-in',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 120,
      }, {
        'title': 'Choose seats',
        'price': 60,
      },
    ],
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 12,
      }, {
        'title': 'Choose places',
        'price': 6,
      },
    ],
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'title': 'Upgrade to a premium',
        'price': 10,
      }, {
        'title': 'Choose seats',
        'price': 40,
      },
    ],
  },
  {
    'type': 'taxi',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 80,
      }, {
        'title': 'Choose the radio station',
        'price': 10,
      },
    ],
  },
  {
    'type': 'bus',
    'offers': [
      {
        'title': 'Choose seats',
        'price': 10,
      },
    ],
  },
  {
    'type': 'train',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 120,
      },
      {
        'title': 'Choose the meal',
        'price': 40,
      },
    ],
  },
  {
    'type': 'ship',
    'offers': [
      {
        'title': 'Upgrade',
        'price': 90,
      },
      {
        'title': 'the meal',
        'price': 80,
      },
    ],
  },
  {
    'type': 'transport',
    'offers': [
      {
        'title': 'Choose the type',
        'price': 19,
      },
    ],
  },
  {
    'type': 'drive',
    'offers': [
      {
        'title': 'Choose car',
        'price': 120,
      },
      {
        'title': 'porta ligula',
        'price': 20,
      },
      {
        'title': 'condimentum sed',
        'price': 10,
      },
      {
        'title': 'nibh vitae',
        'price': 5,
      },
    ],
  },
  {
    'type': 'flight',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 120,
      },
      {
        'title': 'Choose seats',
        'price': 60,
      },
      {
        'title': 'Nullam nunc',
        'price': 90,
      },
    ],
  },
];

export const descriptions = [
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. In rutrum ac purus sit amet tempus.',
  'Fusce tristique felis at fermentum pharetra. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  ' Aliquam id orci ut lectus varius viverra. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
];

export const typeIcons = new Map(Object.entries({
  'bus': 'img/icons/bus.png',
  'check-in': 'img/icons/check-in.png',
  'flight': 'img/icons/flight.png',
  'restaurant': 'img/icons/restaurant.png',
  'ship': 'img/icons/ship.png',
  'sightseeing': 'img/icons/sightseeing.png',
  'taxi': 'img/icons/taxi.png',
  'train': 'img/icons/train.png',
  'transport': 'img/icons/transport.png',
  'drive': 'img/icons/transport.png',
}));

export const destinations = cities.map((city) => {
  return {
    description: `${city}, ${descriptions[getRandomValue(descriptions.length - 1)]}.`,
    name: `${city}`,
    pictures: generateImages(),
  };
});

//Navigation
export const activeNavParam = NavParameters[getRandomValue(NavParameters.length-1)];

//Filters
export const activeFilterParam = FilterTypes[getRandomValue(FilterTypes.length-1)];

//Points data
const TASK_AMOUNT = 20;
export const wayPoints = new Array(TASK_AMOUNT).fill().map(generateWaypoint);
