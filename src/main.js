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

import { getEventPriceSum, getPointCities, getRandomValue, render } from './utils';

const TASK_AMOUNT = 20;
const wayPoints = new Array(TASK_AMOUNT).fill().map(generateWaypoint);

const renderEvents = (container, wayPointsList) => {
  for (const item of wayPointsList) {
    render(container, new TripEventView(item).getElement(), renderPosition.BEFOREEND);
  }
};

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

//Маршрут и стоимость
render(tripMain, new TripInfoView().getElement(), renderPosition.AFTERBEGIN);
const tripInfo = pageHeader.querySelector('.trip-info');
render(tripInfo, new TripInfoMainView(getPointCities(wayPoints), 'no period yet').getElement(), renderPosition.BEFOREEND);
render(tripInfo, new TripInfoCostView(getEventPriceSum(wayPoints)).getElement(), renderPosition.BEFOREEND);

//Меню
const activeMenuParam = menuParameters[getRandomValue(menuParameters.length-1)];
render(tripControlsNavigation, new TripMenuView(sortParameters, activeMenuParam).getElement(), renderPosition.BEFOREEND);

//Фильтры
const activeFilterParam = filterParameters[getRandomValue(filterParameters.length-1)];
render(tripControlsFilters, new TripFilterView(filterParameters, activeFilterParam).getElement(), renderPosition.BEFOREEND);

//Сортировка
const activeSortParam = sortParameters[getRandomValue(sortParameters.length-1)];
render(tripEventsSection, new TripSortView(sortParameters, activeSortParam).getElement(), renderPosition.BEFOREEND);

//Контент
render(tripEventsSection,new TripEventList().getElement(), renderPosition.BEFOREEND);
const tripEventList = tripEventsSection.querySelector('.trip-events__list');
render(tripEventList, new TripEditEventView(cities, types).getElement(), renderPosition.AFTERBEGIN); //cities, types приходят с сервера
render(tripEventList, new TripEditEventView(cities, types, wayPoints[0]).getElement(), renderPosition.AFTERBEGIN);
renderEvents(tripEventList, wayPoints);
