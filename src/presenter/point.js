import TripEventView from '../views/trip-event';
import TripEditEventView from '../views/trip-edit-event';
import { render, replace } from '../utils/render';
import { renderPosition } from '../const';

export default class Point {
  constructor(containerPointList) {
    this._containerPointList = containerPointList;
    this._tripEventComponent = null;
    this._tripEditEventComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._openEventHandler = this._openEventHandler.bind(this);
    this._closeEventHandler = this._closeEventHandler.bind(this);
    this._submitClickHandler = this._submitClickHandler.bind(this);
  }

  init(point, cities, types) {
    this._tripEventComponent = new TripEventView(point);
    this._tripEditEventComponent = new TripEditEventView(cities, types, point);

    this._tripEventComponent.setRollupButtonClickHandler(this._openEventHandler);
    this._tripEditEventComponent.setRollupButtonClickHandler(this._closeEventHandler);
    this._tripEditEventComponent.setSubmitClickHandler(this._submitClickHandler);

    render(this._containerPointList, this._tripEventComponent, renderPosition.BEFOREEND);
  }

  _escKeyDownHandler (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(this._tripEventComponent, this._tripEditEventComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _openEventHandler () {
    replace(this._tripEditEventComponent, this._tripEventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeEventHandler () {
    replace(this._tripEventComponent, this._tripEditEventComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _submitClickHandler () {
    replace(this._tripEventComponent, this._tripEditEventComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }
}
