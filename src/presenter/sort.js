import { renderPosition, sortParameters } from '../const';
import TripSortView from '../views/trip-sort';
import { render } from '../utils/render';

export default class SortPresenter {
  constructor(container) {
    this._container = container;
    this._element = null;
  }

  init(activeParameter) {
    this._element = new TripSortView(sortParameters, this._activeParameter);
    this._activeParameter = activeParameter;
    render(this._container, this._element, renderPosition.AFTERBEGIN);
  }
}
