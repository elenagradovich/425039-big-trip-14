import { cities, types, wayPoints, activeFilterParam, activeNavParam, destinations, offerList } from './mock/data';

const tripEventsContainer = document.querySelector('.trip-events');
const tripMainContainer = document.querySelector('.trip-main');
const tripNavigationContainer = tripMainContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripMainContainer.querySelector('.trip-controls__filters');

import MainPresenter from './presenter/main';
const tripPresenter = new MainPresenter(tripEventsContainer, tripNavigationContainer, tripFiltersContainer, tripMainContainer);
tripPresenter.init(wayPoints, cities, types, destinations, offerList, activeFilterParam, activeNavParam);

