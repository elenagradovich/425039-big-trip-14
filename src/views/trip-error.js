import Abstract from './abstract';

const createErrorTemplate = (message) => `
  <div style='
      position: fixed;
      overflow: auto;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(38, 52, 69, 0.3);'>
    <p class="trip-events__msg">${message}</p>
  </div>
`;

export default class ErrorComponent extends Abstract{
  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate() {
    return createErrorTemplate(this._message);
  }
}
