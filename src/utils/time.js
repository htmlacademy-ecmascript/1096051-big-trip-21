import dayjs from 'dayjs';

const FORMAT_EVENT = {
  DATE: 'DD MMM',
  TIME: 'hh:mm',
  ATRIBUTE: 'YYYY-MM-DDTHH:mm',
  FORM: 'YY/MM/DD HH:mm',
  TRIP_DATE: 'MMM DD'
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

function getDurationText(startTime, endTime) {
  const seconds = (endTime - startTime) / 1000;
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

export {getHumanizeEventTime, getDurationText};
