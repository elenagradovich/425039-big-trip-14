import { RenderPosition, NavParameters } from '../const';
import TripMenuView from '../views/trip-nav';
import { render } from '../utils/render';

export default class NavigationPresenter {
  constructor(container) {
    this._container = container;
    this._element = null;
  }

  init(activeParameter) {
    this._element = new TripMenuView(NavParameters, this._activeParameter);
    this._activeParameter = activeParameter;
    render(this._container, this._element, RenderPosition.BEFOREEND);
  }
}
