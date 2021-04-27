import PointPresenter from './point';
import TripEventListView from '../views/trip-event-list';
import { render } from '../utils/render';
import { renderPosition } from '../const';

export default class Points {
  constructor(container) {
    this._container = container;
    this._pointsComponent = null;
  }

  init(points, cities, types) {
    this._pointsComponent = new TripEventListView();
    this._points = points;
    this._cities = cities;
    this._types = types;
    render(this._container, this._pointsComponent, renderPosition.BEFOREEND);
    this._renderPoints();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsComponent);
    pointPresenter.init(point, this._cities, this._types);
  }

  _renderPoints() {
    for (const point of this._points) {
      this._renderPoint(point);
    }
  }
}
