import { cities, types, wayPoints, destinations, offerList } from './mock/data';
import MainPresenter from './presenter/main';
import PointsModel from './model/points';
import SortModel from './model/sort';
import FilterModel from './model/filters';
import NavigationModel from './model/navigation';

const tripPointsContainer = document.querySelector('.trip-events');
const tripMainContainer = document.querySelector('.trip-main');
const tripNavigationContainer = tripMainContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripMainContainer.querySelector('.trip-controls__filters');


const pointsModel = new PointsModel();
pointsModel.setPoints(wayPoints);
const sortModel = new SortModel();
const filterModel = new FilterModel();
const navigationModel = new NavigationModel();

const tripPresenter = new MainPresenter(tripPointsContainer, tripNavigationContainer, tripFiltersContainer, tripMainContainer,
  pointsModel, sortModel, filterModel, navigationModel);
tripPresenter.init(cities, types, destinations, offerList);

