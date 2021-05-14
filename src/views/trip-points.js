import Abstract from './abstract';

const createTripPointsTemplate = () => {
  return `<ul class="trip-events__list">

          </ul>`;
};

export default class TripPoints extends Abstract{
  constructor() {
    super();
  }

  getTemplate () {
    return createTripPointsTemplate();
  }
}
