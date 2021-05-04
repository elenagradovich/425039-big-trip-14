import { RenderPosition, SortTypes } from '../const';
import TripSortView from '../views/trip-sort';
import {remove, render} from '../utils/render';


export default class SortPresenter {
  constructor(container, sortPublisher) {
    this._container = container;
    this._element = null;
    this._sortPublisher = sortPublisher;
    this._activeSortType = SortTypes.DAY;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._clearSortList = this._clearSortList.bind(this);
  }

  init() {
    this._element = new TripSortView(SortTypes, this._activeSortType);
    this._renderSortElement();
    this._element.setSortButtonClickHandler(this._handleSortTypeChange);
  }

  _renderSortElement() {
    render(this._container, this._element, RenderPosition.AFTERBEGIN );
  }

  _clearSortList() {
    remove(this._element);
  }

  _handleSortTypeChange(sortParam) {
    this._sortPublisher.notify(sortParam);
    this._activeSortType = sortParam;
    this._clearSortList();
    this.init();
  }
}
