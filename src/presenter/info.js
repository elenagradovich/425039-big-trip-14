import { RenderPosition } from '../const';
import {remove, render, replace} from '../utils/render';
import TripInfoView from '../views/trip-info-container';
import TripInfoMainView from '../views/trip-info-main';
import TripInfoCostView from '../views/trip-info-cost';


export default class InfoPresenter {
  constructor(container, infoModel) {
    this._container = container;
    this._elementWrapper = null;
    this._elementInfoCost = null;
    this._elementInfoMain = null;
    this._infoModel = infoModel;
    this._infoModel.subscribe(this._handleModelEvent);
  }

  init() {
    const prevElementWrapper = this._elementWrapper;
    const prevElementInfoCost =  this._elementInfoCost;
    const prevElementInfoMain = this._elementInfoMain;

    this._elementWrapper = new TripInfoView();
    this._elementInfoCost = new TripInfoCostView(this._infoModel.getRouteCost());
    this._elementInfoMain = new TripInfoMainView(this._infoModel.getRouteCities(), this._infoModel.getRoutePeriod());

    if (prevElementWrapper === null && prevElementInfoCost === null && prevElementInfoMain === null) {
      this._renderInfoComponents();
      return;
    }

    replace(this._elementWrapper, prevElementWrapper);
    remove(prevElementWrapper);

    replace(this._elementInfoCost, prevElementInfoCost);
    remove(prevElementInfoCost);

    replace(this._elementInfoMain, prevElementInfoMain);
    remove(prevElementInfoMain);
  }

  _handleModelEvent() {
    this.init();
  }

  _renderInfoComponents() {
    render(this._container, this._elementWrapper, RenderPosition.AFTERBEGIN);
    render(this._elementWrapper, this._elementInfoCost , RenderPosition.AFTERBEGIN);
    render(this._elementWrapper, this._elementInfoMain, RenderPosition.AFTERBEGIN);
  }
}
