import Observer from '../utils/observer';
import {getCostsByType, getCountPointsByType, getDurationsByType} from '../utils/stats';

export default class Stats extends Observer {
  constructor() {
    super();
    this._costsByType = '';
    this._countPointsByType = '';
    this._durationsByType = '';
  }

  getCostsByType() {
    return this._costsByType;
  }

  getCountPointsByType() {
    return this._countPointsByType;
  }

  getDurationsByType() {
    return this._durationsByType;
  }

  setStatsData(points) {
    this._costsByType = getCostsByType(points);
    this._countPointsByType = getCountPointsByType(points);
    this._durationsByType = getDurationsByType(points);
  }
}
