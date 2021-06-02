import MainPresenter from './presenter/main';
import PointsModel from './model/points';
import SortModel from './model/sort';
import FilterModel from './model/filters';
import NavigationModel from './model/navigation';
import InfoModel from './model/info';
import StatsModel from './model/stats';
import API from './api';

const errorContainer = document.querySelector('body');
const tripPointsContainer = document.querySelector('.trip-events');
const tripMainContainer = document.querySelector('.trip-main');
const tripNavigationContainer = tripMainContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const addNewPointButton = document.querySelector('.trip-main__event-add-btn');

const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic ulIa5509g860rat';

const api = new API(END_POINT, AUTHORIZATION, errorContainer);

const pointsModel = new PointsModel();
const sortModel = new SortModel();
const filterModel = new FilterModel();
const navigationModel = new NavigationModel();
const infoModel = new InfoModel();
const statsModel = new StatsModel();

const tripPresenter = new MainPresenter(tripPointsContainer, tripNavigationContainer, tripFiltersContainer, tripMainContainer,
  pointsModel, sortModel, filterModel, navigationModel, infoModel, statsModel, api, addNewPointButton);
tripPresenter.init();

api.getInitialData(pointsModel, infoModel, statsModel);
