import Observer from '../utils/observer';
import { NavTabs } from '../const';

export default class Navigation extends Observer {
  constructor() {
    super();
    this._activeNavTab = NavTabs.TABLE;
  }

  getActiveNavTab() {
    return this._activeNavTab;
  }

  setActiveNavTab(tab) {
    this._activeNavTab = tab;
    this._notify(tab);
  }
}
