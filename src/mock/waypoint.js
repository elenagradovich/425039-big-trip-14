import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { getRandomValue, getActiveOffers } from '../utils/common';
import {cities, descriptions, types} from './data';


const MAX_PHOTO_INDEX = 50;
const MAX_PHOTO_AMOUNT = 5;

export const generateImages = () => {
  return new Array(getRandomValue(MAX_PHOTO_AMOUNT)).fill().map(() =>
    `http://picsum.photos/248/152?r=${getRandomValue(MAX_PHOTO_INDEX)}`);
};

const generateDate = () => dayjs().add(getRandomValue(5000, 1), 'minute');

const generateType =  () => {
  return types[getRandomValue(types.length-1)];
};

export const generateWaypoint = () => {
  const type = generateType();
  const offers =  getActiveOffers(type);
  const dateFrom = generateDate().toDate();
  const dateTo = dayjs(dateFrom).add(getRandomValue(5000, 1), 'minute').toDate();
  return {
    id: nanoid(),
    basePrice: getRandomValue(100),
    dateFrom,
    dateTo,
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
