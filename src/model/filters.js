import Observer from '../utils/observer';
import { FilterTypes } from '../const';

export default class Filters extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterTypes.EVERYTHING;
  }

  setActiveFilter(updateType, filter, rerender) {
    this._activeFilter = filter;
    this._notify(updateType, filter, rerender);
  }

  getActiveFilter() {
    return this._activeFilter;
  }
}
