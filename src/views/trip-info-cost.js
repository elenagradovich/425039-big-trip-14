const createTripInfoCostTemplate = (cost) => {
  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
          </p>`;
};

export default class TripInfoCost {
  constructor(cost) {
    this._element = null;
    this._cost = cost;
  }

  getTemplate () {
    return createTripInfoCostTemplate(this._cost);
  }

  removeElement () {
    this.element = null;
  }
}

