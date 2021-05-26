import Abstract from './abstract';

const createLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class LoadingComponent extends Abstract{
  constructor() {
    super();
  }

  getTemplate() {
    return createLoadingTemplate();
  }
}
