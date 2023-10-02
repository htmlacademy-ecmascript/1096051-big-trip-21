import { getLimitTime } from '../utils/time.js';
import { DATE_TYPE } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class DatepickerAbstract {
  #datepicker = null;
  #options = null;

  #handleDateChange = null;

  constructor({ onDateChange }) {
    this.#handleDateChange = onDateChange;

    this.#options = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
    };
  }

  #setOptionsMaxTime(startTime, endTime, isStartTime) {
    if (!(startTime.getDate() === endTime.getDate())) {
      return;
    }

    if (isStartTime) {
      this.#options.maxTime = getLimitTime(endTime);
    } else {
      this.#options.minTime = getLimitTime(startTime);
    }
  }

  #setDefaultTimeOptions(isStartTime) {
    this.#options = {
      ...this.#options,
      onClose: (evt) => this.#dateChangeHandler(evt, isStartTime),
    };
  }

  #setStartTimeCalendarOptions(endTime, startTime) {
    if (endTime !== null) {
      this.#options = {
        ...this.#options,
        onClose: (evt) => this.#dateChangeHandler(evt, true),
        disable: [(date) => date > endTime]
      };
      return;
    }

    if (endTime !== null && startTime !== null) {
      this.#setOptionsMaxTime(startTime, endTime, true);
    }

    this.#setDefaultTimeOptions(true);
  }

  #setEndTimeCalendarOptions(startTime, endTime) {
    if (startTime !== null) {
      this.#options = {
        ...this.#options,
        onClose: (evt) => this.#dateChangeHandler(evt, false),
        disable: [(date) => date < startTime],
      };
      return;
    }

    if (endTime !== null && startTime !== null) {
      this.#setOptionsMaxTime(startTime, endTime, false);
    }

    this.#setDefaultTimeOptions(false);
  }

  createCalendar(point, element, typeDate) {
    const { startTime, endTime } = point;

    switch (typeDate) {
      case DATE_TYPE.END:
        this.#setEndTimeCalendarOptions(startTime, endTime);
        break;
      case DATE_TYPE.START:
        this.#setStartTimeCalendarOptions(endTime, startTime);
        break;
    }


    this.#datepicker = flatpickr(element, this.#options);
  }

  #dateChangeHandler(evt, isStartTime) {
    this.#handleDateChange(evt, isStartTime);
  }

  removeElement() {
    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }
}
