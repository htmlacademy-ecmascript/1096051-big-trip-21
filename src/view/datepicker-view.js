import { getDefaultFlatpickrOptions, getLimitTime } from '../utils/time.js';
import { DATE_TYPE } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class DatepickerAbstarct {
  #datepicker = null;

  #startTime = null;
  #endTime = null;

  #handleDateChange = null;

  constructor({ point, onDateChange }) {
    this.#handleDateChange = onDateChange;
    this.#startTime = point.startTime;
    this.#endTime = point.endTime;
  }

  createCalendar(element, typeDate) {
    let options = {
      ...getDefaultFlatpickrOptions(),
      minTime: getLimitTime(this.#startTime),
      onClose: (evt) => this.#dateChangeHandler(evt, false),
      disable: [
        (date) => date < this.#startTime
      ]
    };

    if (typeDate === DATE_TYPE.START) {
      options = {
        ...getDefaultFlatpickrOptions(),
        maxTime: getLimitTime(this.#endTime),
        onClose: (evt) => this.#dateChangeHandler(evt, true),
        enable: [
          {
            from: new Date(),
            to: this.#endTime
          }
        ]
      };
    }


    this.#datepicker = flatpickr(
      element,
      options
    );
  }

  #dateChangeHandler(evt, isStartTime) {
    this.#handleDateChange(evt, isStartTime);
  }

  removeElement() {
    if(this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }
}
