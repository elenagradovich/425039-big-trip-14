import Abstract from './abstract';

const createTripInfoTemplate = (cost, cities, period) => `<section class="trip-main__trip-info trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${cities || ''}</h1>
    <p class="trip-info__dates">${period || ''}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost || ''}</span>
  </p>
</section>`;

export default class TripInfo extends Abstract{
  constructor(cost, cities, period) {
    super();
    this._cost = cost;
    this._cities = cities;
    this._period = period;
  }

  getTemplate () {
    return createTripInfoTemplate(this._cost, this._cities, this._period);
  }
}


