import dayjs from 'dayjs';
import { offerList, renderPosition } from'./const';

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

export const render = (container, template, place) => {
  switch (place) {
    case renderPosition.BEFOREEND:
      return container.append(template);
    case renderPosition.AFTERBEGIN:
      return container.prepend(template); }
};

export const renderTemplate = (container, template, place= renderPosition.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};
