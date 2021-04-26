import { renderPosition, navParameters } from '../const';
import TripMenuView from '../views/trip-nav';
import { render } from '../utils/render';

export default class NavigationPresenter {
  constructor(container) {
    this._container = container;
    this._element = new TripMenuView(navParameters, this._activeParameter);
  }

  init(activeParameter) {
    this._activeParameter = activeParameter;
    render(this._container, this._element, renderPosition.BEFOREEND);
  }
}
