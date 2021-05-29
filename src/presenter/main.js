import PointsPresenter from './points';
import FilterPresenter from './filters';
import SortPresenter from './sort';
import NavigationPresenter from './navigation';
import InfoPresenter from './info';

export default class Main {
  constructor(tripContainer, navigationContainer, filtersContainer, tripMainContainer,
    pointsModel, sortModel, filterModel, navigationModel, api) {

    this._tripContainer = tripContainer;
    this._navigationContainer = navigationContainer;
    this._filtersContainer = filtersContainer;
    this._tripMainContainer = tripMainContainer;

    this._pointsModel = pointsModel;
    this._sortModel = sortModel;
    this._filterModel = filterModel;
    this._navigationModel = navigationModel;

    this._api = api;
  }

  init () {
    const pointsPresenter = new PointsPresenter(this._tripContainer,
      this._pointsModel, this._sortModel, this._filterModel, this._api);
    pointsPresenter.init();

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

