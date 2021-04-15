import { menuParameters } from '../const';

export const tripMenuTemplate = (activeType) => {
  const createMenuTemplates = menuParameters.map((menuParam) => `<a class="trip-tabs__btn  ${activeType === menuParam ? 'trip-tabs__btn--active' : ''} href="#">
    ${menuParam}</a>`).join(' ');

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${createMenuTemplates}
          </nav>`;
};
