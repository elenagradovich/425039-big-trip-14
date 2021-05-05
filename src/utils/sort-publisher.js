export default class SortPublisher {
  constructor () {
    this.listeners = [];
  }

  subscribe (callback) {
    this.listeners.push(callback);
  }

  unsubscribe (callback) {
    this.listeners = this.listeners.filter((subscriber) => subscriber !== callback);
  }

  notify (data) {
    this.listeners.forEach((subscriber) => subscriber(data));
  }
}
