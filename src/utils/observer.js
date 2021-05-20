export default class Observer {
  constructor () {
    this._listeners = [];
  }

  subscribe (callback) {
    this._listeners.push(callback);
  }

  unsubscribe (callback) {
    this._listeners = this._listeners.filter((subscriber) => subscriber !== callback);
  }

  _notify (data, payload, rerender= true) {
    this._listeners.forEach((subscriber) => subscriber(data, payload, rerender));
  }
}
