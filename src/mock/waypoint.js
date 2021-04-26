import dayjs from 'dayjs';

import { getRandomValue, getOffers } from '../utils/common';
import {cities, descriptions, types} from './mock-data';


const MAX_PHOTO_INDEX = 50;
const MAX_PHOTO_AMOUNT = 5;

const generateImages = () => {
  return new Array(getRandomValue(MAX_PHOTO_AMOUNT)).fill().map(() =>
    `http://picsum.photos/248/152?r=${getRandomValue(MAX_PHOTO_INDEX)}`);
};

const generateDate = (date) => {
  return date
    ? dayjs(date).add(getRandomValue(1000), 'minutes').toDate()
    : dayjs().add(getRandomValue(3000), 'hours').toDate();
};

const generateType =  () => {
  return types[0];
};

export const generateWaypoint = () => {
  const type = generateType();
  const offers =  getOffers(type);
  return {
    basePrice: getRandomValue(100),
    dateFrom: generateDate(),
    dateTo: generateDate(),
    destination: {
      description: descriptions[getRandomValue(descriptions.length - 1)],
      name: cities[getRandomValue(cities.length - 1)],
      pictures: generateImages(),
    },
    isFavorite: Boolean(getRandomValue()),
    type,
    offers,
  };
};
