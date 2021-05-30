import Observer from '../utils/observer';
import { getEventPriceSum, getFullEventsPeriod, getRouteCities } from '../utils/common';

export default class Info extends Observer {
  constructor() {
    super();
    this._routeCities = '';
    this._routePeriod = '';
    this._routeCost = '';
  }

  setInfoData(points) {
    this._routeCities = getRouteCities(points);
    this._routeCost = getEventPriceSum(points);
    this._routePeriod = getFullEventsPeriod(points);
    this._notify();
  }

  getRouteCities() {
    return this._routeCities;
  }

  getRouteCost() {
    return this._routeCost;
  }

  getRoutePeriod() {
    return this._routePeriod;
  }
}
