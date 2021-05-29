import Abstract from './abstract';

const createTripInfoMainTemplate = (cities, period) => {
  return `<div class="trip-info__main">
            <h1 class="trip-info__title">${cities || ''}</h1>
            <p class="trip-info__dates">${period || ''}</p>
          </div>`;
};

export default class TripInfoMain extends Abstract{
  constructor(cities, period) {
    super();
    this._cities = cities;
    this._period = period;
  }

  getTemplate () {
    return createTripInfoMainTemplate(this._cities, this._period);
  }
}

