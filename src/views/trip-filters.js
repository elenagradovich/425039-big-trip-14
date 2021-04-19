import {createElement} from '../utils';
import Abstract from './abstract';

const createrTripFiltersTemplate = (filterParameters, activeParam) => {
  const createFilterTemplates = filterParameters.map((filterParam) => `<div class="trip-filters__filter">
              <input id="filter-${filterParam}" class="trip-filters__filter-input  visually-hidden"
                type="radio" name="trip-filter" value="${filterParam}"
                ${activeParam === filterParam ? 'checked' : ''}>
              <label class="trip-filters__filter-label" for="filter-${filterParam}">${filterParam}</label>
            </div>`).join(' ');

  return `<form class="trip-filters" action="#" method="get">
            ${createFilterTemplates}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class TripFilters {
  constructor(filterParameters, activeParam) {
    this._element = null;
    this._filterParameters = filterParameters;
    this._activeParam = activeParam;
  }

  getTemplate () {
    return createrTripFiltersTemplate(this._filterParameters, this._activeParam);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement () {
    this.element = null;
  }
}


