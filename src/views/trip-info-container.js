const createTripInfoTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return createTripInfoTemplate();
  }

  removeElement () {
    this.element = null;
  }
}


