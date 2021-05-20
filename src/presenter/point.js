import TripPointView from '../views/trip-point';
import TripEditPointView from '../views/trip-edit-point';
import { remove, render, replace } from '../utils/render';
import { RenderPosition, Mode, UserAction, UpdateType } from '../const';

export default class Point {
  constructor(container, cities, types, destinations, offers, changeData, changeMode) {
    this._container = container;
    this._tripPointComponent = null;
    this._tripEditPointComponent = null;
    this._cities = cities;
    this._types = types;
    this._destinations = destinations;
    this._offers = offers;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handlePointOpen = this._handlePointOpen.bind(this);
    this._handlePointClose = this._handlePointClose.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(point) {
    this._point = point;
    this._prevPoint = this._tripPointComponent;
    this._prevEditPoint = this._tripEditPointComponent;
    this._tripPointComponent = new TripPointView(point);
    this._tripEditPointComponent = new TripEditPointView(this._cities, this._types, this._destinations, this._offers, point);

    this._tripPointComponent.setRollupButtonClickHandler(this._handlePointOpen);
    this._tripEditPointComponent.setRollupButtonClickHandler(this._handlePointClose);
    this._tripEditPointComponent.setSubmitClickHandler(this._handleSubmitClick);
    this._tripEditPointComponent.setDeleteClickHandler(this._handleDeleteClick);

    this._tripPointComponent.setFavouriteButtonClickHandler(this._handleFavoriteClick);

    if (this._prevPoint === null && this._prevEditPoint === null) {
      render(this._container, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._container.getElement().contains(this._prevPoint.getElement())) {
      replace(this._tripPointComponent, this._prevPoint);
    }

    if (this._container.getElement().contains(this._prevEditPoint.getElement())) {
      replace(this._tripEditPointComponent, this._prevEditPoint);
    }

    remove(this._prevPoint);
    remove(this._prevEditPoint);
  }

  _replacePointToEditPoint() {
    replace(this._tripEditPointComponent, this._tripPointComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditPointToPoint() {
    replace(this._tripPointComponent, this._tripEditPointComponent);
    this._mode = Mode.DEFAULT;
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._tripEditPointComponent.reset();
      this._replaceEditPointToPoint();
      document.removeEventListener('keydown', this._handleEscKeyDown);
    }
  }

  _handlePointOpen() {
    this._replacePointToEditPoint();
    document.addEventListener('keydown', this._handleEscKeyDown);

  }

  _handlePointClose() {
    this._tripEditPointComponent.reset();
    this._replaceEditPointToPoint();
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleSubmitClick(point) {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MAJOR,
      point);
    this._replaceEditPointToPoint();
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      point);
    this._handlePointClose();
    this.destroy();
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      Object.assign({}, this._point, {isFavorite: !this._point.isFavorite},
      ),
    );
  }

  resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this._replaceEditPointToPoint();
    }
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._tripEditPointComponent);
  }
}
