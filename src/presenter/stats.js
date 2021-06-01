import {NavTabs, RenderPosition} from '../const';
import { remove, render, replace } from '../utils/render';
import TripStatsView from '../views/trip-stats';


export default class StatsPresenter {
  constructor(container, navigationModel) {
    this._container = container;
    this._element = null;
    this._navigationModel = navigationModel;
  }

  init() {
    if(this._navigationModel.getActiveNavTab() === NavTabs.STATS) {
      const prevElement = this._element;
      this._element = new TripStatsView(this._container);

      if (prevElement === null) {
        this._renderStats();
        return;
      }

      replace(this._element, prevElement);
      remove(prevElement);
    }
  }

  _renderStats() {
    render(this._container, this._element, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._element);
  }
}

