import Observer from '../utils/observer';

export default class Stats extends Observer {
  constructor() {
    super();
  }

  setInfoData(points) {
    this._notify(points);
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
