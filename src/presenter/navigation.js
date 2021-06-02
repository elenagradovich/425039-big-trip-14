import { NavTabs, RenderPosition } from '../const';
import TripNavView from '../views/trip-nav';
import { remove, render, replace } from '../utils/render';

export default class NavigationPresenter {
  constructor(container, navigationModel) {
    this._container = container;
    this._element = null;

    this._navigationModel = navigationModel;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleNavTabChange = this._handleNavTabChange.bind(this);

    this._navigationModel.subscribe(this._handleModelEvent);
  }

  init() {
    this._navTabs = this._getNavTabs();
    const prevNavComponent = this._element;
    this._element = new TripNavView(this._navigationModel.getActiveNavTab(), this._navTabs);
    this._element.setNavTabChangeHandler(this._handleNavTabChange);

    if (prevNavComponent === null) {
      this._renderNavElement();
      return;
    }

    replace(this._element, prevNavComponent);
    remove(prevNavComponent);
  }

  _renderNavElement() {
    render(this._container, this._element, RenderPosition.BEFOREEND);
  }

  _getNavTabs() {
    return Object.values(NavTabs);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleNavTabChange(navTab) {
    if (this._navigationModel.getActiveNavTab() === navTab) {
      return;
    }

    this._navigationModel.setActiveNavTab(navTab);
  }
}
