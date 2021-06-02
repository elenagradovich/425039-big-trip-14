import TripEditPointView from '../views/trip-edit-point';
import { remove, render } from '../utils/render';
import { RenderPosition, Mode, UserAction, UpdateType } from '../const';

export default class PointNew {
  constructor(container, pointsModel, changeData, changeMode, addNewPointButton) {
    this._point = null;
    this._container = container;
    this._newPointComponent = null;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;
    this._pointsModel = pointsModel;

    this._addNewPointButtonElement = addNewPointButton;

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
    this._destinations = this._pointsModel.getDestinations();
    this._cities = this._pointsModel.getCities();
    this._types = this._pointsModel.getTypes();
    this._offers = this._pointsModel.getOffers();

    this._newPointComponent = new TripEditPointView(this._cities, this._types, this._destinations, this._offers, this._point);
    render(this._container, this._newPointComponent , RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._handleEscKeyDown);
    this._newPointComponent.setSubmitClickHandler(this._handleSubmitClick);
    this._newPointComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._newPointComponent.setRollupButtonClickHandler(this._handleDeleteClick);
  }

  _handlePointClose() {
    this._newPointComponent.reset();
    this._addNewPointButtonElement.disabled = false;
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleSubmitClick(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this.destroy();
    }
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  setSaving() {
    this._newPointComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._newPointComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._newPointComponent.shake(resetFormState);
  }

  destroy() {
    if (this._newPointComponent === null) {
      return;
    }

    this._addNewPointButtonElement.disabled = false;
    remove(this._newPointComponent);
    this._newPointComponent = null;

    document.removeEventListener('keydown', this._handleEscKeyDown);
  }
}
