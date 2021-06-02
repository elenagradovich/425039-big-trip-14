import {RenderPosition, UpdateType} from './const';
import PointsModel from './model/points';
import ErrorViewComponent from './views/trip-error';
import {render} from './utils/render';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const END_POINT = {
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
  POINTS: 'points',
};

const HTTP_STATUS = {
  SUCCESS: 200,
  UNAUTORIZED: 401,
  NOT_FOUND: 404,
};

export default class Api {
  constructor(endPoint, authorization, errorContainer) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._errorContainer  = errorContainer;
  }

  getInitialData(pointsModel, infoModel, statsModel) {
    this._pointsModel = pointsModel;
    this._infoModel = infoModel;
    this._statsModel = statsModel;

    const requests = [
      this.loadOffers(),
      this.loadDestinations(),
      this.loadPoints(),
    ];

    Promise.all(requests)
      .then((responses) => {
        this._pointsModel.setOffers(responses[0]);
        this._pointsModel.setDestinations(responses[1]);
        this._pointsModel.setPoints(UpdateType.INIT, responses[2].map((point) => PointsModel.adaptPointToClient(point)));
        this._infoModel.setInfoData(this._pointsModel.getPoints());
        this._statsModel.setStatsData(this._pointsModel.getPoints());
      })
      .catch(() => {
        this._errorComponent = new ErrorViewComponent('Data not available, reload this page');
        render(this._errorContainer , this._errorComponent, RenderPosition.BEFOREEND);
      });
  }

  loadOffers() {
    return this._load({url: END_POINT.OFFERS}).then(Api.toJSON);
  }

  loadDestinations() {
    return this._load({url: END_POINT.DESTINATIONS}).then(Api.toJSON);
  }

  loadPoints() {
    return this._load({url: END_POINT.POINTS}).then(Api.toJSON);
  }

  updatePoint(point) {
    return this._load({
      url: `${END_POINT.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptPointToClient);
  }

  addPoint(point) {
    return this._load({
      url: `${END_POINT.POINTS}`,
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptPointToClient);
  }

  deletePoint(point) {
    return this._load({
      url: `${END_POINT.POINTS}/${point.id}`,
      method: Method.DELETE,
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()})
  {
    headers.append('Authorization', this._authorization);
    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if(response.status === HTTP_STATUS.UNAUTORIZED || response.status === HTTP_STATUS.NOT_FOUND) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    if(response.status !== HTTP_STATUS.SUCCESS) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
