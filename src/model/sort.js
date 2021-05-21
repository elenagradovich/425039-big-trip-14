import Observer from '../utils/observer';
import { SortTypes } from '../const';

export default class Sort extends Observer {
  constructor() {
    super();
    this._activeSortType = SortTypes.DAY;
  }

  setActiveSortType(updateType, type) {
    this._activeSortType = type;
    this._notify(updateType, type);
  }

  getActiveSortType() {
    return this._activeSortType;
  }
}
