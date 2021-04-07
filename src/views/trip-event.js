import dayjs from 'dayjs';

export const tripEventTemplate = (props) => {
  const { base_price, date_from, date_to, is_favorite, offers, type } = props;

  const createOffersTemplate = offers.map(({ title, price }) => `<li className="event__offer">
        <span className="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span className="event__offer-price">${price}</span>
      </li>`).join(' ');

  const typeIcon = new Map(Object.entries({
    'bus': 'img/icons/bus.png',
    'check-in': 'img/icons/check-in.png',
    'flight': 'img/icons/flight.png',
    'restaurant': 'img/icons/restaurant.png',
    'ship': 'img/icons/ship.png',
    'sightseeing': 'img/icons/sightseeing.png',
    'taxi': 'img/icons/taxi.png',
    'train': 'img/icons/train.png',
    'transport': 'img/icons/transport.png',
    'drive': 'img/icons/transport.png',
  }));

  const getDate = (date, type) => {
    let dateFormat;
    switch (type) {
      case 'period':
        dateFormat = 'MM HH';
        break;
      case 'time':
        dateFormat = 'MM:HH';
        break;
      case 'date':
        dateFormat = 'MMM DD';
        break;
      case 'date_full':
        dateFormat = 'YYYY-MM-DD';
        break;
      default:
        dateFormat = 'YYYY-MM-DD HH:mm:ss';
    }

    return dayjs(date).format(dateFormat);
  };

  const favoriteClass = is_favorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${getDate(date_from)}">${getDate(date_from, 'date')}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="${typeIcon.get(type)}" alt="Event type icon">
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
                <p class="event__duration">${getDate(date_from - date_to, 'period')}</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${base_price}</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${createOffersTemplate}
              </ul>

              <button class="${favoriteClass}" type="button">
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
