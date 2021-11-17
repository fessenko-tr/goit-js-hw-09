import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const timerInputReff = document.querySelector('#datetime-picker');
const btnStartReff = document.querySelector('[data-start]');
const FAILURE_MESSAGE = 'Please choose a date in the future';

const timerTextRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let chosenDate = null;
let intervalId = null;

flatpickr(timerInputReff, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  enableSeconds: true,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    ChosenDateCheck();
  },
});

btnStartReff.addEventListener('click', startTimer);

function ChosenDateCheck() {
  if (countRemainingTime(chosenDate) > 0) {
    makeEnabled(btnStartReff);
  } else {
    makeDisabled(btnStartReff);
    Notify.failure(FAILURE_MESSAGE);
  }
}

function countRemainingTime(date) {
  return Date.parse(date) - Date.parse(new Date());
}

function startTimer() {
  makeDisabled(btnStartReff, timerInputReff);
  intervalId = setInterval(timerCountStep, 1000);
}

function timerCountStep() {
  const remainingTime = countRemainingTime(chosenDate);

  if (remainingTime >= 0) {
    updateTimerText(convertMs(remainingTime));
  } else {
    makeEnabled(timerInputReff);
    clearInterval(intervalId);
  }
}

function makeEnabled(el, ...els) {
  //   const elemets = [el, ...els];

  [el, ...els].forEach(el => {
    el.removeAttribute('disabled');
  });
}

function makeDisabled(el, ...els) {
  //   const elemets = [el, ...els];

  [el, ...els].forEach(el => {
    el.setAttribute('disabled', 'disabled');
  });
}

function updateTimerText({ days, hours, minutes, seconds }) {
  timerTextRefs.days.textContent = addLeadingZero(days);
  timerTextRefs.hours.textContent = addLeadingZero(hours);
  timerTextRefs.minutes.textContent = addLeadingZero(minutes);
  timerTextRefs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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
