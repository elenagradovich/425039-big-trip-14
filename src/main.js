import TripInfoView from './views/trip-info-container';
import TripInfoMainView from './views/trip-info-main';
import TripInfoCostView from './views/trip-info-cost';

import TripMenuView from './views/trip-menu';
import TripFilterView from './views/trip-filters';
import TripSortView from './views/trip-sort';

import TripEventList from './views/trip-event-list';
import TripEventView from './views/trip-event';
import TripEditEventView from './views/trip-edit-event';
import { generateWaypoint } from './mock/waypoint.js';
import { menuParameters, sortParameters, filterParameters, types, cities, renderPosition } from './const';

import { getEventPriceSum, getPointCities, getRandomValue, renderTemplate } from './utils';

const TASK_AMOUNT = 20;
const wayPoints = new Array(TASK_AMOUNT).fill().map(generateWaypoint);

const renderEvents = (container, wayPointsList) => {
  for (const item of wayPointsList) {
    renderTemplate(container, new TripEventView(item).getTemplate());
  }
};

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

//Маршрут и стоимость
renderTemplate(tripMain, new TripInfoView().getTemplate(), renderPosition.AFTERBEGIN);
const tripInfo = pageHeader.querySelector('.trip-info');
renderTemplate(tripInfo, new TripInfoMainView(getPointCities(wayPoints), 'no period yet').getTemplate());
renderTemplate(tripInfo, new TripInfoCostView(getEventPriceSum(wayPoints)).getTemplate());

//Меню
const activeMenuParam = menuParameters[getRandomValue(menuParameters.length-1)];
renderTemplate(tripControlsNavigation, new TripMenuView(sortParameters, activeMenuParam).getTemplate());

//Фильтры
const activeFilterParam = filterParameters[getRandomValue(filterParameters.length-1)];
renderTemplate(tripControlsFilters, new TripFilterView(filterParameters, activeFilterParam).getTemplate());

//Сортировка
const activeSortParam = sortParameters[getRandomValue(sortParameters.length-1)];
renderTemplate(tripEventsSection, new TripSortView(sortParameters, activeSortParam).getTemplate());

//Контент
renderTemplate(tripEventsSection,new TripEventList().getTemplate());
const tripEventList = tripEventsSection.querySelector('.trip-events__list');
renderTemplate(tripEventList, new TripEditEventView(cities, types).getTemplate()); //cities, types приходят с сервера
renderTemplate(tripEventList, new TripEditEventView(cities, types, wayPoints[0]).getTemplate());
renderEvents(tripEventList, wayPoints);
