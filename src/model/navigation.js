import Observer from '../utils/observer';
import { NavParameters } from '../const';

export default class Navigation extends Observer {
  constructor() {
    super();
    this._activeNavigation = NavParameters.TABLE;
  }

  getActivePage() {
    return this._activeNavigation;
  }

  setActivePage(updateType, page) {
    this._activeNavigation = page;
    this._notify(updateType, page);
  }
}
