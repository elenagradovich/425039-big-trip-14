import TripEditPointView from '../views/trip-edit-point';
import { remove, render } from '../utils/render';
import { RenderPosition, Mode, UserAction, UpdateType } from '../const';
import { nanoid } from 'nanoid';

export default class PointNew {
  constructor(container, cities, types, destinations, offers, changeData, changeMode) {
    this._point = null;
    this._container = container;
    this._newPointComponent = null;
    this._cities = cities;
    this._types = types;
    this._destinations = destinations;
    this._offers = offers;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handlePointClose = this._handlePointClose.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {
    if (this._newPointComponent !== null) {
      return;
    }
    this._changeMode();
    this._mode = Mode.EDITING;

    this._newPointComponent = new TripEditPointView(this._cities, this._types, this._destinations, this._offers, this._point);
    render(this._container, this._newPointComponent , RenderPosition.AFTERBEGIN);

    this._newPointComponent.setSubmitClickHandler(this._handleSubmitClick);
    this._newPointComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._newPointComponent.setRollupButtonClickHandler(this._handleDeleteClick);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handlePointClose() {
    this._newPointComponent.reset();
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleSubmitClick(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      {...point, id: nanoid()},
    );

    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this.destroy();
    }
  }

  destroy() {
    if (this._newPointComponent === null) {
      return;
    }

    remove(this._newPointComponent);
    this._newPointComponent = null;

    document.removeEventListener('keydown', this._handleEscKeyDown);
  }
}
