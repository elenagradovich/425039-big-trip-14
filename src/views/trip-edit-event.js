import { generateWaypoint } from '../mock/waypoint';
import { getDate } from '../utils';
import { typeIcons, types, cities } from '../const';

export const tripEditEventTemplate = (event = {}) => {
  const {
    basePrice: mockBasePrice,
    dateFrom: mockDateFrom,
    dateTo: mockDateTo,
    destination: mockDestination,
    type: mockType,
    offers: mockOffers,
  } = generateWaypoint();

  const {
    basePrice = mockBasePrice,
    dateFrom =  mockDateFrom,
    dateTo = mockDateTo,
    destination = mockDestination,
    type = mockType,
    offers = mockOffers,
  } = event;

  const createTypeTemplates = ( activeType ) => types.map((type) => `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input visually-hidden"
        type="radio" name="event-type" value="${type.toLowerCase()}"
        ${activeType.toLowerCase() === type.toLowerCase() ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`).join(' ');

  const createOffersTemplate = (offerList, offerType) => {
    return offerList.map((offer) =>
      `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerType}-1" type="checkbox"
                   name="event-offer-${offerType}">
                  <label class="event__offer-label" htmlFor="event-offer-${offerType}-1">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-${offerType}">${offer.price}</span>
                  </label>
              </div>`).join(' ');
  };
  const createPhotoTemplate = (urlList) => {
    return urlList.map((url) => `<img class="event__photo" src="${url}" alt="Event photo">`).join(' ');
  };

  const createCityTemplates = () => {
    return cities.map((city) => `<option value="${city}"></option>`).join(' ');
  };

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon"
                        width="17"
                        height="17"
                        src="${typeIcons.get(type.toLowerCase())}"
                        alt="Event type icon">
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
                      value="${destination.name}"
                      list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createCityTemplates}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDate(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDate(dateTo)}">
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
                      ${createOffersTemplate(offers, type)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPhotoTemplate(destination.pictures)}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};
