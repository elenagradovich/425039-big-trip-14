import { RenderPosition } from '../const';
import TripMenuView from '../views/trip-nav';
import { render } from '../utils/render';

export default class NavigationPresenter {
  constructor(container, navigationModel) {
    this._container = container;
    this._element = null;

    this._navigationModel = navigationModel;
  }

  init() {
    this._element = new TripMenuView(this._navigationModel.getActivePage());
    render(this._container, this._element, RenderPosition.BEFOREEND);
  }
}
