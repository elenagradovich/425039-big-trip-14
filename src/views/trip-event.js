import { favoriteClass, getDate } from '../utils';
import { typeIcons } from '../const';

export const tripEventTemplate = (props) => {
  const { base_price, date_from, date_to, is_favorite, offers, type, destination } = props;
  const { name } = destination;

  const createOffersTemplate = offers.map((offer) => `<li className="event__offer">
        <span className="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span className="event__offer-price">${offer.price}</span>
      </li>`).join(' ');


  const getPeriod = (fromDate, toDate) => {
    //return getPeriodFormat(toDate, fromDate);
    return 'no period yet';
  };


  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${getDate(date_from)}">${getDate(date_from, 'date')}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="${typeIcons.get(type.toLowerCase())}" alt="Event type icon">
              </div>
              <h3 class="event__title">${type} ${name}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${getDate(date_from, 'date_full')}">
                     ${getDate(date_from, 'time')}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${getDate(date_to, 'date_full')}">
                     ${getDate(date_to, 'time')}</time>
                </p>
                <p class="event__duration">${getPeriod(date_from - date_to)}</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${base_price}</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${createOffersTemplate}
              </ul>

              <button class="${favoriteClass(is_favorite)}" type="button">
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
