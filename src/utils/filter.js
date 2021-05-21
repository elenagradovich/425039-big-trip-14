import { FilterTypes } from '../const';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

const nowIsBetween = (dateFrom, dateTo) =>  dayjs().isBetween(dateFrom, dateTo, null, '[)');
const nowIsSameOrBefore = (date) => dayjs().isSameOrBefore(date, null, '[)');

export const filter = {
  [FilterTypes.EVERYTHING]: (points) => points.slice(),
  [FilterTypes.FUTURE]: (points) => points.filter((point) => nowIsBetween(point.dateFrom, point.dateTo) || nowIsSameOrBefore(point.dateFrom)),
  [FilterTypes.PAST]: (points) => points.filter((point) => nowIsBetween(point.dateFrom, point.dateTo) || !nowIsSameOrBefore(point.dateTo)),
};
