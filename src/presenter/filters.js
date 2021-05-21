import {FilterTypes, RenderPosition, UpdateType, SortTypes} from '../const';
import TripFiltersView from '../views/trip-filters';
import { render, replace, remove } from '../utils/render';

export default class FilterPresenter {
  constructor(container, filterModel, pointModel, sortModel) {
    this._container = container;
    this._element = null;

    this._filterModel = filterModel;
    this._pointModel = pointModel;
    this._sortModel = sortModel;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointModel.subscribe(this._handleModelEvent);
    this._filterModel.subscribe(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._element;
    this._element = new TripFiltersView(filters, this._filterModel.getActiveFilter());
    this._element.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      this._renderFilterElement();
      return;
    }

    replace(this._element, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _renderFilterElement() {
    render(this._container, this._element, RenderPosition.BEFOREEND);
  }

  _getFilters() {
    return Object.values(FilterTypes);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getActiveFilter() === filterType) {
      return;
    }

    this._sortModel.setActiveSortType(UpdateType.MAJOR, SortTypes.DAY);
    this._filterModel.setActiveFilter(UpdateType.MAJOR, filterType);
  }
}
