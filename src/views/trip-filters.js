import { filterParameters } from '../const';

export const tripFiltersTemplate = (activeParam) => {

  const createSortTemplates = filterParameters.map((filterParam) => `<div class="trip-filters__filter">
              <input id="filter-${filterParam}" class="trip-filters__filter-input  visually-hidden"
                type="radio" name="trip-filter" value="${filterParam}"
                ${activeParam === filterParam ? 'checked' : ''}>
              <label class="trip-filters__filter-label" for="filter-${filterParam}">${filterParam}</label>
            </div>`).join(' ');

  return `<form class="trip-filters" action="#" method="get">
            ${createSortTemplates}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};
