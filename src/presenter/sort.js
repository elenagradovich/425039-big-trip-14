import {RenderPosition, SortTypes, UpdateType} from '../const';
import TripSortView from '../views/trip-sort';
import {remove, render, replace} from '../utils/render';


export default class SortPresenter {
  constructor(container, sortModel, filterModel) {
    this._container = container;
    this._element = null;

    this._sortModel = sortModel;
    this._filterModel = filterModel;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filterModel.subscribe(this._handleModelEvent);
    this._sortModel.subscribe(this._handleModelEvent);
  }

  init() {
    const sortTypes = this._getSortTypes();
    const prevSortComponent = this._element;
    this._element = new TripSortView(sortTypes, this._sortModel.getActiveSortType());
    this._element.setSortButtonClickHandler(this._handleSortTypeChange);

    if (prevSortComponent === null) {
      this._renderSortElement();
      return;
    }

    replace(this._element, prevSortComponent);
    remove(prevSortComponent);
  }

  _renderSortElement() {
    render(this._container, this._element, RenderPosition.AFTERBEGIN );
  }

  _getSortTypes() {
    return Object.values(SortTypes);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleSortTypeChange(sortParam) {
    if (this._sortModel.getActiveSortType() === sortParam) {
      return;
    }

    this._sortModel.setActiveSortType(UpdateType.MAJOR, sortParam);
  }

  destroy() {
    remove(this._element);
  }
}
