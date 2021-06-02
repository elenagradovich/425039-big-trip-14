import { RenderPosition} from '../const';
import { remove, render } from '../utils/render';
import TripStatsView from '../views/trip-stats';


export default class StatsPresenter {
  constructor(container, statsModel) {
    this._container = container;
    this._element = null;
    this._statsModel = statsModel;
  }

  init() {
    this._element = new TripStatsView(
      this._statsModel.getCostsByType(),
      this._statsModel.getCountPointsByType(),
      this._statsModel.getDurationsByType());
    this._renderStats();
  }

  _renderStats() {
    render(this._container, this._element, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._element);
  }
}

