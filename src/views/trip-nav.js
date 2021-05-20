import Abstract from './abstract';
import { NavParameters } from '../const';

const createTripNavigationTemplate = (navParameters, activeType) => {
  const createMenuTemplates = navParameters.map((menuParam) => `<a class="trip-tabs__btn  ${activeType === menuParam ? 'trip-tabs__btn--active' : ''} href="#">
    ${menuParam}</a>`).join(' ');

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${createMenuTemplates}
          </nav>`;
};

export default class TripNavigation extends Abstract{
  constructor(activeParam) {
    super();
    this._navParameters = Object.values(NavParameters);
    this._activeParam = activeParam;
  }

  getTemplate () {
    return createTripNavigationTemplate(this._navParameters, this._activeParam);
  }
}
