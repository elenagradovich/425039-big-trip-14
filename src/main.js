import { tripInfoTemplate } from './views/trip-info-container';
import { tripInfoMainTemplate } from './views/trip-info-main';
import { tripInfoCostTemplate } from './views/trip-info-cost';

import { tripMenuTemplate } from './views/trip-menu';
import { tripFiltersTemplate } from './views/trip-filters';
import { tripSortTemplate } from './views/trip-sort';

import { tripEventListTemplate } from './views/trip-event-list';
import { tripEventTemplate } from './views/trip-event';
import { tripEditEventTemplate } from './views/trip-edit-event';
import { generateWaypoint } from './mock/waypoint.js';
import { menuParameters, sortParameters, filterParameters, types, cities } from './const';

import { getEventPriceSum, getPointCities, getRandomValue } from './utils';

const renderElement = (container, template, place='beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const TASK_AMOUNT = 20;
const wayPoints = new Array(TASK_AMOUNT).fill().map(generateWaypoint);

const renderEvents = (container, wayPointsList) => {
  for (const item of wayPointsList) {
    renderElement(container, tripEventTemplate(item));
  }
};

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

//Маршрут и стоимость
renderElement(tripMain, tripInfoTemplate(), 'afterbegin');
const tripInfo = pageHeader.querySelector('.trip-info');
renderElement(tripInfo, tripInfoMainTemplate(getPointCities(wayPoints)));
renderElement(tripInfo, tripInfoCostTemplate(getEventPriceSum(wayPoints)));

//Меню
renderElement(tripControlsNavigation, tripMenuTemplate(menuParameters[getRandomValue(menuParameters.length-1)]));

//Фильтры
renderElement(tripControlsFilters, tripFiltersTemplate(filterParameters[getRandomValue(filterParameters.length-1)]));

//Сортировка
renderElement(tripEventsSection, tripSortTemplate(sortParameters[getRandomValue(sortParameters.length-1)]));

//Контент
renderElement(tripEventsSection, tripEventListTemplate());
const tripEventList = tripEventsSection.querySelector('.trip-events__list');
renderElement(tripEventList, tripEditEventTemplate(cities, types)); //cities, types приходят с сервера
renderElement(tripEventList, tripEditEventTemplate(cities, types, wayPoints[0]));
renderEvents(tripEventList, wayPoints);
