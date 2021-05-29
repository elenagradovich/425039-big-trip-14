import { UpdateType } from './const';
import PointsModel from './model/points';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
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
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getInitialData(pointsModel) {
    this._pointsModel = pointsModel;
    const urls = [END_POINT.OFFERS, END_POINT.DESTINATIONS, END_POINT.POINTS];
    const requests = urls.map((url) => this._load({url: url}));

    Promise.all(requests)
      .catch(() => [[], [], []])
      .then((responses) => {
        this._pointsModel.setOffers(responses[0]);
        this._pointsModel.setDestinations(responses[1]);
        this._pointsModel.setPoints(UpdateType.INIT, responses[2].map((point) => PointsModel.adaptPointToClient(point)));
      });
  }

  getOffers() {
    return this._load({url: END_POINT.OFFERS});
  }

  getDestinations() {
    return this._load({url: END_POINT.DESTINATIONS});
  }

  getPoints() {
    return this._load({url: END_POINT.POINTS});
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
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
      .then(Api.toJSON)
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
