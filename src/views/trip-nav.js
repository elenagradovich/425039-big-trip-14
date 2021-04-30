import Abstract from './abstract';

const createTripNavigationTemplate = (navParameters, activeType = navParameters[0]) => {
  const createMenuTemplates = navParameters.map((menuParam) => `<a class="trip-tabs__btn  ${activeType === menuParam ? 'trip-tabs__btn--active' : ''} href="#">
    ${menuParam}</a>`).join(' ');

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${createMenuTemplates}
          </nav>`;
};

export default class TripNavigation extends Abstract{
  constructor(navParameters, activeParam) {
    super();
    this._navParameters = navParameters;
    this._activeParam = activeParam;
  }

  getTemplate () {
    return createTripNavigationTemplate(this._navParameters, this._activeParam);
  }
}
