import { RenderPosition } from '../const';
import { remove, render, replace } from '../utils/render';
import TripInfoView from '../views/trip-info';


export default class InfoPresenter {
  constructor(container, infoModel) {
    this._container = container;
    this._element = null;
    this._infoModel = infoModel;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._infoModel.subscribe(this._handleModelEvent);
  }

  init() {
    const prevElement = this._element;
    this._element = new TripInfoView(this._infoModel.getRouteCost(), this._infoModel.getRouteCities(), this._infoModel.getRoutePeriod());

    if (prevElement === null) {
      this._renderInfo();
      return;
    }

    replace(this._element, prevElement);
    remove(prevElement);
  }

  _handleModelEvent() {
    this.init();
  }

  _renderInfo() {
    render(this._container, this._element, RenderPosition.AFTERBEGIN);
  }
}
