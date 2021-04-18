import {createElement} from '../utils';

const createTripMenuTemplate = (menuParameters, activeType) => {
  const createMenuTemplates = menuParameters.map((menuParam) => `<a class="trip-tabs__btn  ${activeType === menuParam ? 'trip-tabs__btn--active' : ''} href="#">
    ${menuParam}</a>`).join(' ');

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${createMenuTemplates}
          </nav>`;
};

export default class TripFilters {
  constructor(menuParameters, activeParam) {
    this._element = null;
    this._menuParameters = menuParameters;
    this._activeParam = activeParam;
  }

  getTemplate () {
    return createTripMenuTemplate(this._menuParameters, this._activeParam);
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
