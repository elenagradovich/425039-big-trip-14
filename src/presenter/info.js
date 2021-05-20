import { RenderPosition } from '../const';
import { render } from '../utils/render';
import TripInfoView from '../views/trip-info-container';
import TripInfoMainView from '../views/trip-info-main';
import TripInfoCostView from '../views/trip-info-cost';
import { getEventPriceSum, getPointCities } from '../utils/common';


export default class InfoPresenter {
  constructor(container, pointsModel) {
    this._container = container;
    this._elementWrapper = null;
    this._cities = [];
    this._cost = null;
    this._pointsModel = pointsModel;
  }

  init() {
    this._elementWrapper = new TripInfoView();
    render(this._container, this._elementWrapper, RenderPosition.AFTERBEGIN);
    this._renderCostInfo();
    this._renderCitiesInfo();
  }

  _getCities () {
    this._cities =  getPointCities(this._pointsModel.getPoints());
  }

  _getCost () {
    this._cost =  getEventPriceSum(this._pointsModel.getPoints());
  }

  _renderCostInfo() {
    this._getCost();
    const tripInfoCost = new TripInfoCostView(this._cost);
    render(this._elementWrapper, tripInfoCost, RenderPosition.AFTERBEGIN);
  }

  _renderCitiesInfo() {
    this._getCities();
    const tripInfoMain = new TripInfoMainView(this._cities);
    render(this._elementWrapper, tripInfoMain, RenderPosition.AFTERBEGIN);
  }
}
