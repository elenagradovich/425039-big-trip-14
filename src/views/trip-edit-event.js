import { getDate } from '../utils/common';
import {typeIcons} from '../mock/data';
import Abstract from './abstract';

const createTripEditEventTemplate = (cities, types, event = {}) => {
  const {
    basePrice = '',
    dateFrom =  '',
    dateTo = '',
    destination = '',
    type = '',
    offers = '',
  } = event;

  const {
    name = '',
    description = '',
    pictures = '',
  } = destination;

  const createTypeTemplates = ( activeType ) => {
    return types.map((type) => `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input visually-hidden"
        type="radio" name="event-type" value="${type.toLowerCase()}"
        ${activeType.toLowerCase() === type.toLowerCase() ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`).join(' ');
  };

  const createOffersTemplate = () => {
    return offers && offers.map((offer) =>
      `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox"
                   name="event-offer-${type}">
                  <label class="event__offer-label" htmlFor="event-offer-${type}-1">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-${type}">${offer.price}</span>
                  </label>
              </div>`).join(' ');
  };

  const createPhotoTemplate = () => {
    return pictures && pictures.map((url) => `<img class="event__photo" src="${url}" alt="Event photo">`).join(' ');
  };

  const createCityOptions = () => {
    return cities && cities.map((city) => `<option value="${city}"></option>`).join(' ');
  };

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      ${type && `<img class="event__type-icon"
                        width="17"
                        height="17"
                        src="${typeIcons.get(type.toLowerCase())}"
                        alt="Event type icon">`}
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createTypeTemplates(type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination"
                      id="event-destination-1"
                      type="text"
                      name="event-destination"
                      value="${name}"
                      list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createCityOptions()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom && getDate(dateFrom)}">

                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo && getDate(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price"
                      value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${createOffersTemplate()}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPhotoTemplate(pictures)}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};

export default class TripEditEvent extends Abstract {
  constructor(cities, types, event = {}) {
    super();
    this._cities = cities;
    this._types = types;
    this._event = event;

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._submitClickHandler = this._submitClickHandler.bind(this);
  }

  getTemplate () {
    return createTripEditEventTemplate(this._cities, this._types, this._event);
  }

  _rollupButtonClickHandler (evt) {
    evt.preventDefault();
    this._callback.rollupButtonClickHandler();
  }

  setRollupButtonClickHandler (callback) {
    this._callback.rollupButtonClickHandler = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupButtonClickHandler);
  }

  _submitClickHandler (evt) {
    evt.preventDefault();
    this._callback.submitClickHandler();
  }

  setSubmitClickHandler (callback) {
    this._callback.submitClickHandler = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._submitClickHandler);
  }
}
