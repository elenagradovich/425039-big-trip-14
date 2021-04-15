import { sortParameters } from '../const';

export const tripSortTemplate = ( activeParam ) => {
  const createSortTemplates = sortParameters.map((sortParam) => `<div class="trip-sort__item  trip-sort__item--${sortParam}">
              <input id="sort-${sortParam}" class="trip-sort__input  visually-hidden"
                type="radio" name="trip-sort"
                value="sort-${sortParam}"
                ${activeParam === sortParam ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-${sortParam}">${sortParam}</label>
            </div>`).join(' ');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
          ${createSortTemplates}
          </form>`;
};
