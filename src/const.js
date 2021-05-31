export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const FilterTypes = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};

export const NavParameters = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const SortTypes = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFER: 'Offer',
};

export const DateFormat = {
  TIME: 'HH:MM',
  DATE: 'MMM DD',
  DATE_TIME: 'MMM DD HH:MM',
  DATE_FULL: 'YYYY-MM-DD',
  DEFAULT: 'DD/MM/YY HH:MM',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};


export const TypeIcons = new Map(Object.entries({
  'bus': 'img/icons/bus.png',
  'check-in': 'img/icons/check-in.png',
  'flight': 'img/icons/flight.png',
  'restaurant': 'img/icons/restaurant.png',
  'ship': 'img/icons/ship.png',
  'sightseeing': 'img/icons/sightseeing.png',
  'taxi': 'img/icons/taxi.png',
  'train': 'img/icons/train.png',
  'transport': 'img/icons/transport.png',
  'drive': 'img/icons/drive.png',
}));

export const ActionState = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};
