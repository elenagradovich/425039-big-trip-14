import TripEventView from '../views/trip-event';
import TripEditEventView from '../views/trip-edit-event';
import { remove, render, replace } from '../utils/render';
import { renderPosition } from '../const';

export default class Point {
  constructor(container) {
    this._container = container;
    this._tripEventComponent = null;
    this._tripEditEventComponent = null;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleEventOpen = this._handleEventOpen.bind(this);
    this._handleEventClose = this._handleEventClose.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
  }

  init(point, cities, types) {
    this._prevPoint = this._tripEventComponent;
    this._prevEditPoint = this._tripEditEventComponent;
    this._tripEventComponent = new TripEventView(point);
    this._tripEditEventComponent = new TripEditEventView(cities, types, point);
    this._tripEventComponent.setRollupButtonClickHandler(this._handleEventOpen);
    this._tripEditEventComponent.setRollupButtonClickHandler(this._handleEventClose);
    this._tripEditEventComponent.setSubmitClickHandler(this._handleSubmitClick);

    if(this._prevPoint === null && this._prevEditPoint === null) {
      render(this._container, this._tripEventComponent, renderPosition.BEFOREEND);
      return;
    }

    if(this._container.getElement().contains(this._prevPoint.getElement())) {
      render(this._container, this._tripEventComponent, renderPosition.BEFOREEND);
    }

    remove(this._prevPoint);
    remove(this._prevEditPoint);
  }

  _replaceEventToEditEvent () {
    replace(this._tripEditEventComponent, this._tripEventComponent);
  }

  _replaceEditEventToEvent () {
    replace(this._tripEventComponent, this._tripEditEventComponent);
  }

  _handleEscKeyDown (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditEventToEvent();
      document.removeEventListener('keydown', this._handleEscKeyDown);
    }
  }

  _handleEventOpen () {
    this._replaceEventToEditEvent();
    document.addEventListener('keydown', this._handleEscKeyDown);
  }

  _handleEventClose () {
    this._replaceEditEventToEvent();
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleSubmitClick () {
    this._replaceEditEventToEvent();
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  destroy () {
    remove(this._tripEventComponent);
    remove(this._tripEditEventComponent);
  }
}
