import PointPresenter from './point';
import TripEventListView from '../views/trip-event-list';
import { render } from '../utils/render';
import { updateItem } from '../utils/common';
import { renderPosition } from '../const';

export default class Points {
  constructor(container) {
    this._container = container;
    this._pointsComponent = null;
    this._pointPresenter = {};

    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(points, cities, types) {
    this._pointsComponent = new TripEventListView();
    this._points = points;
    this._cities = cities;
    this._types = types;
    render(this._container, this._pointsComponent, renderPosition.BEFOREEND);
    this._renderPoints();
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsComponent, this._cities, this._types, this._handlePointChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    for (const point of this._points) {
      this._renderPoint(point);
    }
  }
}
