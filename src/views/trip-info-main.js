export const tripInfoMainTemplate = (cities) => {
  return `<div class="trip-info__main">
            <h1 class="trip-info__title">${cities.join('-')}</h1>
            <p class="trip-info__dates">no period</p>
          </div>`;
};
