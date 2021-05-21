import Abstract from './abstract';

const createrTripFiltersTemplate = (filters, activeFilter) => {
  const createFilterTemplates = filters.map((filter) => `<div class="trip-filters__filter">
              <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden"
                type="radio" name="trip-filter" value="${filter}"
                ${activeFilter === filter ? 'checked' : ''}>
              <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
            </div>`).join(' ');

  return `<form class="trip-filters" action="#" method="get">
            ${createFilterTemplates}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class TripFilters extends Abstract{
  constructor(filters, activeFilter) {
    super();
    this._activeFilter = activeFilter;
    this._filters = filters;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate () {
    return createrTripFiltersTemplate(this._filters, this._activeFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}


