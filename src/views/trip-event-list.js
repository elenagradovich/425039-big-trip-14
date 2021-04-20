import Abstract from './abstract';

const createTripEventListTemplate = () => {
  return `<ul class="trip-events__list">

          </ul>`;
};

export default class TripEventList extends Abstract{
  constructor() {
    super();
  }

  getTemplate () {
    return createTripEventListTemplate();
  }
}
