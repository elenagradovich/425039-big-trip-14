import Observer from '../utils/observer';

export default class Points extends Observer{
  constructor() {
    super();
    this._points = [];
    this._offers = [];
    this._destinations = [];
    this._types = [];
    this._cities = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();
    this._setTypes();
  }

  _setTypes() {
    if(this._offers.length > 0) {
      this._types = this._offers.map((offer) => offer.type);
    }
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
    this._setCities();
  }

  _setCities() {
    if(this._destinations.length > 0) {
      this._cities = this._destinations.map((destination) => destination.name);
    }
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  getOffers() {
    return this._offers;
  }

  getDestinations() {
    return this._destinations;
  }

  getTypes() {
    return this._types;
  }

  getCities() {
    return this._cities;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptPointToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point.base_price,
      dateFrom: point.date_from !== null ? new Date(point.date_from) : point.date_from,
      dateTo: point.date_to !== null ? new Date(point.date_to) : point.date_to,
      isFavorite: point.is_favorite,
    };

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptPointToServer(point) {
    const adaptedTask = {
      ...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateFrom.toISOString() : null,
      'is_favorite': point.isFavorite,
    };

    delete adaptedTask.basePrice;
    delete adaptedTask.dateFrom;
    delete adaptedTask.dateTo;
    delete adaptedTask.isFavorite;


    return adaptedTask;
  }
}
