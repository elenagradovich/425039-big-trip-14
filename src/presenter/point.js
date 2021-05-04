import TripEventView from '../views/trip-event';
import TripEditEventView from '../views/trip-edit-event';
import { remove, render, replace } from '../utils/render';
import { RenderPosition, Mode } from '../const';

export default class Point {
  constructor(container, cities, types, changeData, changeMode) {
    this._container = container;
    this._tripEventComponent = null;
    this._tripEditEventComponent = null;
    this._cities = cities;
    this._types = types;
    this._changeData = changeData;

    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleEventOpen = this._handleEventOpen.bind(this);
    this._handleEventClose = this._handleEventClose.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;
    this._prevPoint = this._tripEventComponent;
    this._prevEditPoint = this._tripEditEventComponent;
    this._tripEventComponent = new TripEventView(point);
    this._tripEditEventComponent = new TripEditEventView(point, this._cities, this._types);

    this._tripEventComponent.setRollupButtonClickHandler(this._handleEventOpen);
    this._tripEditEventComponent.setRollupButtonClickHandler(this._handleEventClose);
    this._tripEditEventComponent.setSubmitClickHandler(this._handleSubmitClick);

    this._tripEventComponent.setFavouriteButtonClickHandler(this._handleFavoriteClick);

    if (this._prevPoint === null && this._prevEditPoint === null) {
      render(this._container, this._tripEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._container.getElement().contains(this._prevPoint.getElement())) {
      replace(this._tripEventComponent, this._prevPoint);
    }

    if (this._container.getElement().contains(this._prevEditPoint.getElement())) {
      replace(this._tripEditEventComponent, this._prevEditPoint);
    }

    remove(this._prevPoint);
    remove(this._prevEditPoint);
  }

  _replaceEventToEditEvent() {
    replace(this._tripEditEventComponent, this._tripEventComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditEventToEvent() {
    replace(this._tripEventComponent, this._tripEditEventComponent);
    this._mode = Mode.DEFAULT;
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditEventToEvent();
      document.removeEventListener('keydown', this._handleEscKeyDown);
    }
  }

  _handleEventOpen() {
    this._replaceEventToEditEvent();
    document.addEventListener('keydown', this._handleEscKeyDown);

  }

  _handleEventClose() {
    this._replaceEditEventToEvent();
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleSubmitClick() {
    this._replaceEditEventToEvent();
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign({}, this._point, {isFavorite: !this._point.isFavorite},
      ),
    );
  }

  resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this._replaceEditEventToEvent();
    }
  }

  destroy() {
    remove(this._tripEventComponent);
    remove(this._tripEditEventComponent);
  }
}

