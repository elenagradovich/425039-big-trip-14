import { UpdateType } from './const';
import PointsModel from './model/points';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const URLS = {
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
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getInitialData(pointsModel) {
    this._pointsModel = pointsModel;
    const urls = [ URLS.OFFERS, URLS.DESTINATIONS, URLS.POINTS];
    const requests = urls.map((url) => this._load({url: url}));

    Promise.all(requests)
      .then((responses) =>  responses.map((item) => Api.toJSON(item)))
      .then((responses) => {
        this._pointsModel.setOffers(responses[0]);
        this._pointsModel.setDestinations(responses[1]);
        this._pointsModel.setPoints(UpdateType.INIT, responses[2].map((point) => PointsModel.adaptPointToClient(point)));
      })
      .catch(() => {
        this._pointsModel.setOffers([]);
        this._pointsModel.setDestinations([]);
        this._pointsModel.setPoints(UpdateType.INIT, []);
      });
  }

  getOffers() {
    return this._load({url: URLS.OFFERS})
      .then(Api.toJSON);
  }

  getDestinations() {
    return this._load({url: URLS.DESTINATIONS})
      .then(Api.toJSON);
  }

  getPoints() {
    return this._load({url: URLS.POINTS,
    })
      .then(Api.toJSON);
  }

  updateTask(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptPointToClient);
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
    if(response.status === HTTP_STATUS.UNAUTORIZED) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    if(response.status === HTTP_STATUS.NOT_FOUND) {
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
