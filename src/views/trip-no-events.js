import Abstract from './abstract';

const createNoEventsTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoEventsComponent extends Abstract{
  constructor() {
    super();
  }

  getTemplate () {
    return createNoEventsTemplate();
  }
}
