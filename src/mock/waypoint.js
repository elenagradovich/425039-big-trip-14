import dayjs from 'dayjs';

const types = ['check-in', 'sightseeing', 'restaurant',
  'taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight'];

const cities = ['Madrid', 'London', 'Paris', 'Tel Aviv', 'Rome'];

const offerTitles = ['Choose meal', 'Upgrade to comfort class', 'Order Uber'];

const descriptions = [
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. In rutrum ac purus sit amet tempus.',
  'Fusce tristique felis at fermentum pharetra. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  ' Aliquam id orci ut lectus varius viverra. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
];

const getRandomValue = (maxLength = 1, minLength = 0) => {
  const lower = Math.ceil(Math.min(minLength, maxLength));
  const upper = Math.floor(Math.max(minLength, maxLength));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const MAX_FHOTO_INDEX = 50;
const MAX_FHOTO_AMOUNT = 5;

const generatePhotos = () => {
  return new Array(getRandomValue(MAX_FHOTO_AMOUNT)).fill().map(() =>
    `http://picsum.photos/248/152?r=${getRandomValue(MAX_FHOTO_INDEX)}`);
};

const generateDate = (date) => {
  return date ? dayjs(date).add(getRandomValue(1000), 'minutes').toDate() : dayjs().add(getRandomValue(3000), 'hours').toDate();
};

const MAX_OFFER_PRICE = 50;
const MIN_OFFER_PRICE = 5;

const generateOffers = (amount) => {
  const offerList = new Array(amount).fill().map(() => {
    return {
      title: offerTitles[getRandomValue(offerTitles.length - 1)],
      price: getRandomValue(MAX_OFFER_PRICE, MIN_OFFER_PRICE),
    };
  });
  return offerList;
};

export const generateWaypoint = () => {
  return {
    base_price: getRandomValue(100),
    date_from: generateDate(),
    date_to: generateDate(),
    destination: {
      description: descriptions[getRandomValue(descriptions.length - 1)],
      name: cities[getRandomValue(cities.length - 1)],
      pictures: generatePhotos(),
    },
    is_favorite: Boolean(getRandomValue()),
    offers: generateOffers(getRandomValue(3)),
    type: types[getRandomValue(types.length - 1)],
  };
};
