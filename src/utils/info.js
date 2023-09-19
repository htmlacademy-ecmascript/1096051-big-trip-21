import { sortPoints } from './sort.js';
import { getHumanizeEventTime } from './time.js';

function getTotalPrice(points) {
  const initialValue = 0;
  return points.reduce((total, point) => total + point.price, initialValue);
}

function getDestinationsText(points) {
  const destinationsList = sortPoints(points).map(({destination}) => destination.name);

  if (points.length > 3) {
    return `${destinationsList.at(0)} —...— ${destinationsList.at(-1)}`;
  }

  return destinationsList.join(' — ');
}

function getStartTripDate(points) {
  const minDate = Math.min(...points.map(({startTime}) => startTime));
  return getHumanizeEventTime(minDate, 'TRIP_DATE');
}

function getEndTripDate(points) {
  const maxDate = Math.max(...points.map(({endTime}) => endTime));
  return getHumanizeEventTime(maxDate, 'TRIP_DATE');
}

function getTripDateText(points) {
  const startDate = getStartTripDate(points).split(' ');
  const endDate = getEndTripDate(points).split(' ');
  const startDateMonth = startDate[0];
  const endDateMonth = endDate[0];
  let text = `${getStartTripDate(points)} – ${getEndTripDate(points)}`;

  if (startDateMonth === endDateMonth) {
    text = `${startDate.join(' ')} – ${endDate[1]}`;
  }

  return text;
}

export { getTotalPrice, getDestinationsText, getTripDateText };
