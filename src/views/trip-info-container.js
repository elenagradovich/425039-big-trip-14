import Abstract from './abstract';

const createTripInfoTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class TripInfo extends Abstract{
  constructor() {
    super();
  }

  getTemplate () {
    return createTripInfoTemplate();
  }
}


