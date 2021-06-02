import { getDiffDates } from '../utils/common';

const sortData = (data) => {
  return new Map([...data.entries()]
    .sort((prev, next) => {
      return next[1] - prev[1];
    }));
};

export const getCostsByType = (points) => {
  const costsByType = new Map();

  points.forEach((point) => {
    if (costsByType.has(point.type.toUpperCase())) {
      let moneyByType = costsByType.get(point.type.toUpperCase());
      moneyByType += point.basePrice;
      costsByType.set(point.type.toUpperCase(), moneyByType);
    } else {
      costsByType.set(point.type.toUpperCase(), point.basePrice);
    }
  });
  return sortData(costsByType);
};

export const getCountPointsByType = (points) => {
  const pointsByType = new Map();
  points.forEach((point) => {
    if (pointsByType.has(point.type.toUpperCase())) {
      let pointsCountByType = pointsByType.get(point.type.toUpperCase());
      pointsCountByType++;
      pointsByType.set(point.type.toUpperCase(), pointsCountByType);
    } else {
      pointsByType.set(point.type.toUpperCase(), 1);
    }
  });
  return sortData(pointsByType);
};

export const getDurationsByType = (points) => {
  const durationsByType = new Map();

  points.forEach((point) => {
    if (durationsByType.has(point.type.toUpperCase())) {
      let duration = durationsByType.get(point.type.toUpperCase());
      duration += getDiffDates(point.dateFrom, point.dateTo, 'minutes');
      durationsByType.set(point.type.toUpperCase(), duration);
    } else {
      durationsByType.set(point.type.toUpperCase(), getDiffDates(point.dateFrom, point.dateTo, 'minutes'));
    }
  });
  return sortData(durationsByType);
};
