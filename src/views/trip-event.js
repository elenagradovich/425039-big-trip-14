import {createElement, getDate, getPeriod} from '../utils';
import { typeIcons } from '../const';

const createTripEventTemplate = ({ basePrice, dateFrom, dateTo, isFavorite, offers, type, destination }) => {
  const { name } = destination;

  const checkIsFavoriteClass = (isFavorite) => {
    return isFavorite
      ? 'event__favorite-btn event__favorite-btn--active'
      : 'event__favorite-btn';
  };

  const createOffersTemplate = offers.map((offer) => `<li className="event__offer">
        <span className="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span className="event__offer-price">${offer.price}</span>
      </li>`).join(' ');

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${getDate(dateFrom)}">${getDate(dateFrom, 'date')}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="${typeIcons.get(type.toLowerCase())}" alt="Event type icon">
              </div>
              <h3 class="event__title">${type} ${name}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${getDate(dateFrom, 'date_full')}">
                     ${getDate(dateFrom, 'time')}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${getDate(dateTo, 'date_full')}">
                     ${getDate(dateTo, 'time')}</time>
                </p>
                <p class="event__duration">${getPeriod(dateFrom,dateTo)}</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${createOffersTemplate}
              </ul>

              <button class="${checkIsFavoriteClass(isFavorite)}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
};

export default class TripEvent {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate () {
    return createTripEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement () {
    this.element = null;
  }
}
