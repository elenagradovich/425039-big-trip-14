import {createElement} from '../utils';

const createTripSortTemplate = (sortParameters, activeParam) => {
  const createSortTemplates = sortParameters.map((sortParam) => `<div class="trip-sort__item  trip-sort__item--${sortParam}">
              <input id="sort-${sortParam}" class="trip-sort__input  visually-hidden"
                type="radio" name="trip-sort"
                value="sort-${sortParam}"
                ${activeParam === sortParam ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-${sortParam}">${sortParam}</label>
            </div>`).join(' ');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
          ${createSortTemplates}
          </form>`;
};

export default class TripSort {
  constructor(sortParameters, activeParam) {
    this._element = null;
    this._sortParameters = sortParameters;
    this._activeParam = activeParam;
  }

  getTemplate () {
    return createTripSortTemplate(this._sortParameters, this._activeParam);
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
