import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

const timerInputReff = document.querySelector('#datetime-picker');
const btnStartReff = document.querySelector('[data-start]');

const timerTextRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let chosenDate = null;
let intId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  enableSeconds: true,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    if (isChosenTimeCorrect()) {
      btnStartReff.removeAttribute('disabled');
    } else {
      btnStartReff.setAttribute('disabled', 'disabled');
      Notify.failure('Please choose a date in the future');
    }
  },
};

const fp = flatpickr(timerInputReff, options);

btnStartReff.addEventListener('click', () => {
  intId = setInterval(timerCount, 1000);
});

function timerCount() {
  const howMuc = countRemainingTime();

  if (howMuc >= 0) {
    updateTimerText(convertMs(howMuc));
    btnStartReff.setAttribute('disabled', 'disabled');
    timerInputReff.setAttribute('disabled', 'disabled');
  } else {
    timerInputReff.removeAttribute('disabled');
    clearInterval(intId);
  }
}

function isChosenTimeCorrect() {
  return countRemainingTime() > 0;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function countRemainingTime() {
  return Date.parse(chosenDate) - Date.parse(new Date());
}

function updateTimerText({ days, hours, minutes, seconds }) {
  timerTextRefs.days.textContent = addLeadingZero(days);
  timerTextRefs.hours.textContent = addLeadingZero(hours);
  timerTextRefs.minutes.textContent = addLeadingZero(minutes);
  timerTextRefs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
