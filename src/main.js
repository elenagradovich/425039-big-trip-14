import MainPresenter from './presenter/main';
import PointsModel from './model/points';
import SortModel from './model/sort';
import FilterModel from './model/filters';
import NavigationModel from './model/navigation';
import API from './api';
import { UpdateType } from './const';

const tripPointsContainer = document.querySelector('.trip-events');
const tripMainContainer = document.querySelector('.trip-main');
const tripNavigationContainer = tripMainContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripMainContainer.querySelector('.trip-controls__filters');

const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic ulIa5599g860rad';

const api = new API(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const sortModel = new SortModel();
const filterModel = new FilterModel();
const navigationModel = new NavigationModel();

const tripPresenter = new MainPresenter(tripPointsContainer, tripNavigationContainer, tripFiltersContainer, tripMainContainer,
  pointsModel, sortModel, filterModel, navigationModel);
tripPresenter.init();

api.getDestinations()
  .then((destinations) => {
    pointsModel.setDestinations(destinations);
  })
  .catch(() => {
    pointsModel.setDestinations([]);
  });

api.getOffers()
  .then((offers) => {
    pointsModel.setOffers(offers);
  })
  .catch(() => {
    pointsModel.setOffers([]);
  });

api.getPoints()
  .then((points) => {
     
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });


