import PointPresenter from './point';
import TripEventListView from '../views/trip-event-list';
import { render } from '../utils/render';
import { updateItem, sortPointsPrice, sortPointsTime } from '../utils/common';
import { RenderPosition, SortTypes } from '../const';


export default class Points {
  constructor(container, sortPublisher) {
    this._container = container;
    this._pointsComponent = null;
    this._pointPresenterContainer = {};
    this._piblisher = sortPublisher;

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._piblisher.subscribe((type) => this._handleSortTypeChange(type));
  }

  init(points, cities, types) {
    this._currentSortType = SortTypes.DAY;
    this._sourcedPoints = points.slice();
    this._pointsComponent = new TripEventListView();
    this._points = points;
    this._cities = cities;
    this._types = types;
    render(this._container, this._pointsComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenterContainer[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object.values(this._pointPresenterContainer).forEach((presenter) => presenter.resetView());
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsComponent, this._cities, this._types,
      this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenterContainer[point.id] = pointPresenter;
  }


  _renderPoints() {
    for (const point of this._points) {
      this._renderPoint(point);
    }
  }

  _handleSortTypeChange(sortType) {
    if(this._currentSortType.toLowerCase() === sortType.toLowerCase()) return;
    this._sortPoints(sortType);
    this._clearPointsList();
    this._renderPoints();
  }

  _sortPoints(type) {
    switch (type) {
      case SortTypes.PRICE:
        this._points.sort(sortPointsPrice);
        break;
      case SortTypes.TIME:
        this._points.sort(sortPointsTime);
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = type;
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenterContainer)
      .forEach((pointPresenter) => pointPresenter.destroy());
    this._pointPresenterContainer = {};
  }
}
