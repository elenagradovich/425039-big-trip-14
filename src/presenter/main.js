import PointsPresenter from './points';
import FilterPresenter from './filters';
import SortPresenter from './sort';
import NavigationPresenter from './navigation';
import InfoPresenter from './info';
import StatsPresenter from './stats';
import { NavTabs } from '../const';

export default class Main {
  constructor(tripContainer, navigationContainer, filtersContainer, tripMainContainer,
    pointsModel, sortModel, filterModel, navigationModel, infoModel, statsModel, api, addNewPointButton) {

    this._tripContainer = tripContainer;
    this._navigationContainer = navigationContainer;
    this._filtersContainer = filtersContainer;
    this._tripMainContainer = tripMainContainer;

    this._pointsModel = pointsModel;
    this._sortModel = sortModel;
    this._filterModel = filterModel;
    this._navigationModel = navigationModel;
    this._infoModel = infoModel;
    this._statsModel = statsModel;

    this._api = api;
    this._addNewPointButton = addNewPointButton;

    this.handleNavTabClick = this.handleNavTabClick.bind(this);
    this._navigationModel.subscribe(this.handleNavTabClick);
  }

  init () {
    this._pointsPresenter = new PointsPresenter(this._tripContainer,
      this._pointsModel, this._sortModel, this._filterModel, this._infoModel, this._navigationModel, this._statsModel,
      this._api, this._addNewPointButton);
    this._pointsPresenter.init();

    this._sortPresenter = new SortPresenter(this._tripContainer, this._sortModel, this._filterModel);
    this._sortPresenter.init();

    const navigationPresenter = new NavigationPresenter(this._navigationContainer, this._navigationModel);
    navigationPresenter.init();

    const filtersPresenter = new FilterPresenter(this._filtersContainer, this._filterModel, this._pointsModel, this._sortModel);
    filtersPresenter.init();

    const infoPresenter = new InfoPresenter(this._tripMainContainer, this._infoModel);
    infoPresenter.init();

    this._statsPresenter = new StatsPresenter(this._tripContainer, this._statsModel);


  }

  handleNavTabClick(activeTab) {
    switch (activeTab) {
      case NavTabs.TABLE:
        this._statsPresenter.destroy();
        this._pointsPresenter.init();
        this._sortPresenter.init();
        this._addNewPointButton.disabled = false;
        break;
      case NavTabs.STATS:
        this._sortPresenter.destroy();
        this._pointsPresenter.destroy();
        this._statsPresenter.init();
        this._addNewPointButton.disabled = true;
        break;
    }
  }
}


