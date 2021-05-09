import dayjs from 'dayjs';
import { offerList } from '../mock/data';

export const getRandomValue = (maxLength = 1, minLength = 0) => {
  const lower = Math.ceil(Math.min(minLength, maxLength));
  const upper = Math.floor(Math.max(minLength, maxLength));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getDate = (date, type) => {
  let dateFormat;
  switch (type) {
    case 'time':
      dateFormat = 'MM:HH';
      break;
    case 'date':
      dateFormat = 'MMM DD';
      break;
    case 'date_full':
      dateFormat = 'YYYY-MM-DD';
      break;
    default:
      dateFormat = 'DD/MM/YY HH:mm';
  }
  return dayjs(date).format(dateFormat);
};

export const getActiveOffers = (type) => {
  const arr = offerList.filter((item) => item.type === type);
  return arr[0].offers.slice(0, 1);
};

export const getPointCities = (eventPoints) => {
  const cities = new Set();
  for(const point of eventPoints) {
    cities.add(point.destination.name);
  }
  return Array.from(cities);
};

export const getFullEventPrice = (point) => {
  const { basePrice, offers } = point;
  const offerPricesSum = offers.map((item) => item.price).reduce(((sum, item) => sum + item), basePrice);
  return offerPricesSum + basePrice;
};


export const getEventPriceSum = (eventPoints) => {
  return eventPoints.reduce((pointSum, point) => {
    return pointSum + getFullEventPrice(point);
  }, 0);
};

export const getPeriod = (dateFrom, dateTo) => `${getDate(dateFrom, 'date_full')} - ${getDate(dateTo,'date_full')}`;

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortPointsTime = (pointPrev, pointNext) => {
  const periodPrev = dayjs(pointPrev.dateTo).diff(dayjs(pointPrev.dateFrom), 'second');
  const periodNext = dayjs(pointNext.dateTo).diff(dayjs(pointNext.dateFrom), 'second');
  return periodNext - periodPrev;
};

export const sortPointsPrice = (pointPrev, pointNext) => pointPrev.basePrice - pointNext.basePrice;

export const checkIsContains = (name, items) =>  {
  return items && items.some((item) => {
    return item.title === name;
  });
};
