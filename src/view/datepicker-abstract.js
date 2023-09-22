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
      'time_24hr': true
    };
  }

  createCalendar(point, element, typeDate) {
    const {startTime, endTime} = point;

    if (typeDate === DATE_TYPE.END) {
      this.#options = {
        ...this.#options,
        minTime: getLimitTime(startTime),
        onClose: (evt) => this.#dateChangeHandler(evt, false),
        disable: [
          (date) => date < startTime
        ]
      };
    }

    if (typeDate === DATE_TYPE.START) {
      this.#options = {
        ...this.#options,
        maxTime: getLimitTime(endTime),
        onClose: (evt) => this.#dateChangeHandler(evt, true),
        enable: [
          {
            from: new Date(),
            to: endTime
          }
        ]
      };
    }


    this.#datepicker = flatpickr(
      element,
      this.#options
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
