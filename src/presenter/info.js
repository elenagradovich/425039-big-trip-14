import { renderPosition } from '../const';
import { render } from '../utils/render';
import TripInfoView from '../views/trip-info-container';
import TripInfoMainView from '../views/trip-info-main';
import TripInfoCostView from '../views/trip-info-cost';
import { getEventPriceSum, getPointCities } from '../utils/common';


export default class InfoPresenter {
  constructor(container) {
    this._container = container;
    this._elementWrapper = new TripInfoView();
    this._cities = [];
    this._cost = null;
  }

  init(points) {
    this._points = points;
    render(this._container, this._elementWrapper, renderPosition.AFTERBEGIN);
    this._renderCostInfo();
    this._renderCitiesInfo();
  }

  _getCities (points) {
    this._cities =  getPointCities(points);
  }

  _getCost (points) {
    this._cost =  getEventPriceSum(points);
  }

  _renderCostInfo() {
    this._getCost(this._points);
    const tripInfoCost = new TripInfoCostView(this._cost);
    render(this._elementWrapper, tripInfoCost, renderPosition.AFTERBEGIN);
  }

  _renderCitiesInfo() {
    this._getCities(this._points);
    const tripInfoMain = new TripInfoMainView(this._cities);
    render(this._elementWrapper, tripInfoMain, renderPosition.AFTERBEGIN);
  }
}
