import dayjs from 'dayjs';
import { getRandomPositiveInteger } from './utils';

const FORMAT_EVENT = {
  DATE: 'DD MMM',
  TIME: 'hh:mm',
  ATRIBUTE: 'YYYY-MM-DDTHH:mm',
  FORM: 'DD/MM/YY HH:mm',
  TRIP_DATE: 'MMM DD'
};

const TIME = {
  YEAR: 2023,
  MAX_MONTHS: 12,
  MAX_DAYS: 31,
  MAX_HOURS: 24,
  MAX_MINUTES: 60,
  MAX_SECONDS: 60,
};

function getHumanizeEventTime(date, type) {
  return dayjs(date).format(FORMAT_EVENT[type]);
}

function getFormattedTime(time) {
  return String(time).length < 2 ? String(0) + time : time;
}

function getDurationFormatTime (minutes, hours, days) {
  let text = '';
  if (days) {
    text += `${getFormattedTime(days)}D `;
  }

  if (hours) {
    text += `${getFormattedTime(hours)}H `;
  }

  text += `${getFormattedTime(minutes)}M`;

  return text;
}

function getTimeDiff(startTime, endTime) {
  return endTime - startTime;
}

function getDurationText(startTime, endTime) {
  const seconds = getTimeDiff(startTime, endTime) / 1000;
  let minutes = seconds / 60;
  let hours;
  let days;

  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes %= 60;
  }
  if (hours >= 24) {
    days = Math.floor(hours / 24);
    hours %= 24;
  }

  return getDurationFormatTime(minutes, hours, days);
}

function getRandomDate() {
  const month = getRandomPositiveInteger(1, TIME.MAX_MONTHS);
  const day = getRandomPositiveInteger(1, TIME.MAX_DAYS);
  const hour = getRandomPositiveInteger(1, TIME.MAX_HOURS);
  const minute = getRandomPositiveInteger(1, TIME.MAX_MINUTES);
  const second = getRandomPositiveInteger(1, TIME.MAX_SECONDS);


  return new Date(
    TIME.YEAR,
    month,
    day,
    hour,
    minute,
    second
  );
}

function getLimitTime(time) {
  return `${time.getHours()}:${time.getMinutes()}`;
}

function getDefaultFlatpickrOptions() {
  return {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    // eslint-disable-next-line camelcase
    time_24hr: true
  };
}

export { getHumanizeEventTime, getDurationText, getRandomDate, getTimeDiff, getLimitTime, getDefaultFlatpickrOptions };
