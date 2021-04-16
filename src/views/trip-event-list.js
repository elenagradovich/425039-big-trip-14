const createTripEventListTemplate = () => {
  return `<ul class="trip-events__list">

          </ul>`;
};

export default class TripEventList {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return createTripEventListTemplate();
  }

  removeElement () {
    this.element = null;
  }
}
