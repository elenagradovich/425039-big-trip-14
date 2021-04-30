import { renderPosition, filterParameters } from '../const';
import TripFiltersView from '../views/trip-filters';
import { render } from '../utils/render';

export default class FilterPresenter {
  constructor(container) {
    this._container = container;
    this._element = null;
  }

  init(activeParameter) {
    this._element = new TripFiltersView(filterParameters, this._activeParameter);
    this._activeParameter = activeParameter;
    render(this._container, this._element, renderPosition.BEFOREEND);
  }
}
