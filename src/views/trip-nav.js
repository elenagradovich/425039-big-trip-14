import Abstract from './abstract';

const createTripNavigationTemplate = (navTabs, activeTab) => {
  const createMenuTemplates = navTabs.map((navTab) => `<a
    class="trip-tabs__btn
    ${activeTab === navTab ? 'trip-tabs__btn--active' : ''}
    href="#"
    data-nav-tab="${navTab}">
    ${navTab}</a>`).join(' ');

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${createMenuTemplates}
          </nav>`;
};

export default class TripNav extends Abstract{
  constructor(activeTab, navTabs) {
    super();
    this._navTabs = navTabs;
    this._activeTab = activeTab;

    this._navTabClickHandler = this._navTabClickHandler.bind(this);
  }

  getTemplate () {
    return createTripNavigationTemplate(this._navTabs, this._activeTab);
  }

  _navTabClickHandler(evt) {
    evt.preventDefault();
    this._callback.navTabClick(evt.target.dataset.navTab);
  }

  setNavTabChangeHandler(callback) {
    this._callback.navTabClick = callback;
    this.getElement().addEventListener('click', this._navTabClickHandler);
  }
}
