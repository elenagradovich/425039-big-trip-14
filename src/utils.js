import dayjs from 'dayjs';
import { offerList } from'./const';

export const getRandomValue = (maxLength = 1, minLength = 0) => {
  const lower = Math.ceil(Math.min(minLength, maxLength));
  const upper = Math.floor(Math.max(minLength, maxLength));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const favoriteClass = (is_favorite) => {
  return is_favorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';
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

export const getOffers = (type) => {
  const offers = offerList.filter((item) => item.type === type);
  return offers[0].offers;
};

export const getPointCities = (eventPoints) => {
  const cities = new Set();
  for(const point of eventPoints) {
    cities.add(point.destination.name);
  }
  return Array.from(cities);
};

const getFullEventPrice = (point) => {
  const { base_price, offers } = point;
  const offerPricesSum = offers.map((item) => item.price).reduce((sum, item) => sum + item);
  return offerPricesSum + base_price;
};


export const getEventPriceSum = (eventPoints) => {
  return eventPoints.reduce((pointSum, point) => {
    return pointSum + getFullEventPrice(point);
  }, 0);
};

export const getPeriod = (dateFrom, dateTo) => `${getDate(dateFrom, 'date_full')} - ${getDate(dateTo,'date_full')}`;
