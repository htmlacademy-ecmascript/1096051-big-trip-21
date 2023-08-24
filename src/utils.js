import dayjs from 'dayjs';

const FORMAT_EVENT = {
  DATE: 'DD MMM',
  TIME: 'hh:mm'
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getHumanizeEventTime(date, type) {
  return dayjs(date).format(FORMAT_EVENT[type]);
}

function getFormattedTime(time) {
  return String(time).length < 2 ? String(0) + time : time;
}

export { getRandomArrayElement, getHumanizeEventTime, getFormattedTime };
