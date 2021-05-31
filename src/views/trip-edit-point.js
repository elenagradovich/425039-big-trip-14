import SmartView from './smart';
import dayjs from 'dayjs';
import { getDateInFormat, getDiffDates } from '../utils/common';
import { DateFormat, TypeIcons } from '../const';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const DEFAULT_OFFER = {
  basePrice: '',
  dateFrom:  dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  type: '',
  offers: '',
};


const createTripEditPointTemplate = (point, cities, types, offersByType) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    type,
    offers,
    isSaveDisabled,
  } = point;

  const {
    name,
    description,
    pictures,
  } = destination;

  const createTypeTemplates = ( activeType ) => {
    return types && types.map((type) => `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input visually-hidden"
        type="radio" name="event-type" value="${type.toLowerCase()}"
        ${activeType.toLowerCase() === type.toLowerCase() ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}"
        for="event-type-${type.toLowerCase()}-1"
        data-event-type="${type}">${type}</label>
    </div>`).join(' ');
  };

  const createOffersTemplate = (offersByType) => {

    return offersByType && offersByType.map((offerByType, index) => `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${index}" type="checkbox"
             name="event-offer-${type}-${index}"  ${offers.some((item) => item.title === offerByType.title) ? 'checked' : ''} />
            <label class="event__offer-label"
              for="event-offer-${type}-${index}"
              data-event-offer="${offerByType.title}">
              <span class="event__offer-title">${offerByType.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-${type}">${offerByType.price}</span>
            </label>
        </div>`)
      .join(' ');
  };

  const createPhotoTemplate = () => {
    if(!pictures) {
      return '';
    }
    return pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join(' ');
  };

  const createCityOptions = () => {
    if(!cities) {
      return '';
    }
    return cities.map((city) => `<option value="${city}">${city}</option>`).join(' ');
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
                        src="${TypeIcons.get(type.toLowerCase())}"
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
                      ${createCityOptions(cities)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom} ${dateFrom && getDateInFormat(dateFrom, DateFormat.DEFAULT)}">
                    <span>&#8212;</span>
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo} ${dateTo && getDateInFormat(dateTo, DateFormat.DEFAULT)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" name="event-price" type="number"
                      value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isSaveDisabled ? 'disabled' : ''}>Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${offersByType.length > 0 ? `
                    <section class="event__section  event__section--offers">
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">
                        ${createOffersTemplate(offersByType)}
                      </div>
                    </section>` : ''}
                  ${(pictures && pictures.length > 0 || description) && `
                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${description}</p>
                      <div class="event__photos-container">
                        <div class="event__photos-tape">
                          ${createPhotoTemplate(pictures)}
                        </div>
                      </div>
                    </section>`}
                </section>
              </form>
            </li>`;
};

export default class TripEditPoint extends SmartView {
  constructor(cities, types, destinations, offers, point) {
    super();
    this._cities = cities;
    this._types = types;
    this._destinations = destinations;
    this._offers = offers;
    this._initialPoint = point || DEFAULT_OFFER;
    this._state = TripEditPoint.parseTripPointToState(this._initialPoint);
    this._datePickerStart = null;
    this._datePickerEnd = null;
    this._offersByCurrentType = this._getOffersByType();

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._offerClickHandler = this._offerClickHandler.bind(this);
    this._setInnerHandlers();

    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);
    this._setDatePicker(this._datePickerStart, '#event-start-time-1', this._state.dateFrom, this._dateStartChangeHandler);
    this._setDatePicker(this._datePickerEnd, '#event-end-time-1', this._state.dateTo, this._dateEndChangeHandler);
  }

  getTemplate () {
    return createTripEditPointTemplate(this._state, this._cities, this._types, this._offersByCurrentType);
  }

  restoreHandlers() {
    this.setRollupButtonClickHandler(this._callback.rollupButtonClickHandler);
    this._setInnerHandlers();
    this.setSubmitClickHandler(this._callback.submitClickHandler);
    this.setDeleteClickHandler(this._callback.deleteClickHandler);
    this._setDatePicker(this._datePickerStart, '#event-start-time-1', this._state.dateFrom, this._dateStartChangeHandler);
    this._setDatePicker(this._datePickerEnd, '#event-end-time-1', this._state.dateTo, this._dateEndChangeHandler);
  }

  static parseTripPointToState(point) {
    return {
      ...point,
      isSaveDisabled: !point.destination.name};
  }

  static parseStateToTripPoint(state) {
    state = {...state};
    delete state.isSaveDisabled;

    return state;
  }

  _getOffersByType() {
    const offersByType = this._offers && this._offers.find((offer) => this._initialPoint.type === offer.type);
    return offersByType ? offersByType.offers : [];
  }

  _setDatePicker(element, elementSelector, initialValue, changeHandler) {
    if (element) {
      element.destroy();
      element = null;
    }
    element = flatpickr(
      this.getElement().querySelector(elementSelector),
      {
        time_24hr: true,
        enableTime: true,
        dateFormat: 'd/m/Y h:i',
        defaultDate: initialValue,
        onChange: changeHandler,
      },
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('click', this._typeClickHandler);
    this.getElement()
      .querySelector('.event__input.event__input--destination')
      .addEventListener('input', this._destinationInputHandler);
    const offerElements = this.getElement()
      .querySelectorAll('.event__offer-label');
    for (const element of offerElements) {
      element.addEventListener('click', this._offerClickHandler);
    }
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._priceInputHandler);
  }

  _dateStartChangeHandler([userDate]) {
    if(this._state.dateTo) {
      if(getDiffDates(userDate, this._state.dateTo, 'second') > 0) {
        this.updateData({
          dateFrom: userDate,
        }, true);
      }
    } else {
      this.updateData({
        dateFrom: userDate,
      }, true);
    }
  }

  _dateEndChangeHandler([userDate]) {
    if(this._state.dateFrom) {
      if(getDiffDates(this._state.dateFrom, userDate, 'second') > 0) {
        this.updateData({
          dateTo: userDate,
        }, true);
      }
    } else {
      this.updateData({
        dateTo: userDate,
      }, true);
    }
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    let newPrice = evt.target.value;
    if(newPrice.includes(',')) {
      newPrice = newPrice.replace(/,/, '.');
    }

    this.updateData({
      basePrice:  Math.round(newPrice),
    }, true);
  }

  _typeClickHandler (evt) {
    evt.preventDefault();
    const newType = evt.target.dataset.eventType;
    this._offersByCurrentType = this._offers.filter((item) => item.type === newType)[0].offers;
    this.updateData({
      type: newType,
      offers: [],
    });
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    const newDestinationName = evt.target.value;
    const newDestination = this._destinations.find((item) => item.name === newDestinationName);

    this.updateData(
      {
        destination: newDestination || {
          name: '',
          description: '',
          pictures: [],
        },
        isSaveDisabled: !newDestination,
      });
  }

  _getCheckedOffers(title) {
    const offers = [...this._state.offers];
    if(offers.some((item) => item.title === title)) {
      return offers.filter((offer) => offer.title !== title);
    } else {
      const result = this._offersByCurrentType.find((offer) => offer.title === title);
      offers.push(result);
      return offers;
    }
  }

  _offerClickHandler (evt) {
    const activeOfferTitle = evt.currentTarget.dataset.eventOffer;
    const checkedOffers  = this._getCheckedOffers(activeOfferTitle);

    this.updateData({
      offers: checkedOffers,
    }, true);
  }

  _rollupButtonClickHandler (evt) {
    evt.preventDefault();
    this._callback.rollupButtonClickHandler();
  }

  setRollupButtonClickHandler (callback) {
    this._callback.rollupButtonClickHandler = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._rollupButtonClickHandler);
  }

  _submitClickHandler (evt) {
    evt.preventDefault();
    this._callback.submitClickHandler(TripEditPoint.parseStateToTripPoint(this._state));
  }

  setSubmitClickHandler (callback) {
    this._callback.submitClickHandler = callback;
    this.getElement()
      .querySelector('.event--edit')
      .addEventListener('submit', this._submitClickHandler);
  }

  _deleteClickHandler (evt) {
    evt.preventDefault();
    this._callback.deleteClickHandler(this._initialPoint);
  }

  setDeleteClickHandler (callback) {
    this._callback.deleteClickHandler = callback;
    this.getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', this._deleteClickHandler);
  }

  reset() {
    this.updateData(this._initialPoint);
  }
}
