import PointsPresenter from './points';
import FilterPresenter from './filters';
import SortPresenter from './sort';
import NavigationPresenter from './navigation';
import InfoPresenter from './info';

export default class Main {
  constructor(tripContainer, navigationContainer, filtersContainer, tripMainContainer,
    pointsModel, sortModel, filterModel, navigationModel) {

    this._tripContainer = tripContainer;
    this._navigationContainer = navigationContainer;
    this._filtersContainer = filtersContainer;
    this._tripMainContainer = tripMainContainer;

    this._pointsModel = pointsModel;
    this._sortModel = sortModel;
    this._filterModel = filterModel;
    this._navigationModel = navigationModel;
  }

  init (cities, types, destinations, offers) {
    this._cities = cities;
    this._types = types;
    this._destinations = destinations;
    this._offers = offers;

    const pointsPresenter = new PointsPresenter(this._tripContainer, this._pointsModel, this._sortModel, this._filterModel);
    pointsPresenter.init(this._cities, this._types, this._destinations, this._offers);

    const sortPresenter = new SortPresenter(this._tripContainer, this._sortModel, this._filterModel);
    sortPresenter.init();

    const navigationPresenter = new NavigationPresenter(this._navigationContainer, this._navigationModel);
    navigationPresenter.init();

    const filtersPresenter = new FilterPresenter(this._filtersContainer, this._filterModel, this._pointsModel, this._sortModel);
    filtersPresenter.init();

    const infoPresenter = new InfoPresenter(this._tripMainContainer, this._pointsModel);
    infoPresenter.init();
  }
}

