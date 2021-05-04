import Abstract from './abstract';

const createTripSortTemplate = (sortParameters, activeSortType) => {
  const createSortTemplates = Object.values(sortParameters).
    map((sortType) => `<div class="trip-sort__item  trip-sort__item--${sortType}">
        <input id="sort-${sortType}"
          class="trip-sort__input  visually-hidden"
          type="radio" name="trip-sort"
          value="sort-${sortType}"
          ${activeSortType === sortType ? 'checked' : ''}>
        <label
          class="trip-sort__btn"
          for="sort-${sortType}"
          data-sort-type="${sortType}">${sortType}
        </label>
    </div>`).join(' ');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${createSortTemplates}
          </form>`;
};

export default class TripSort extends Abstract{
  constructor(sortParameters, activeParam) {
    super();
    this._sortParameters = sortParameters;
    this._activeParam = activeParam;
    this._sortButtonClickHandler = this._sortButtonClickHandler.bind(this);
  }

  getTemplate () {
    return createTripSortTemplate(this._sortParameters, this._activeParam);
  }

  _sortButtonClickHandler (evt) {
    evt.preventDefault();
    this._callback.sortButtonClickHandler(evt.target.dataset.sortType);
  }

  setSortButtonClickHandler (callback) {
    this._callback.sortButtonClickHandler = callback;
    const sortElements = [ ...this.getElement().children];
    sortElements.forEach((elem) => elem.addEventListener('click', this._sortButtonClickHandler));
  }
}
