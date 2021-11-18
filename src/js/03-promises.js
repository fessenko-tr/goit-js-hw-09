import { Notify } from 'notiflix/build/notiflix-notify-aio';

let delay = 0;
let step = 0;
let quantity = 0;

const btnSubmitRef = document.querySelector('button');

const inputRefs = {
  firstDelay: document.querySelector('[name=delay]'),
  delayStep: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
};

btnSubmitRef.addEventListener('click', runPromises);

function runPromises(e) {
  e.preventDefault();
  readDataFromInputs();
  toggleButton();

  let currentDelay = delay;

  createPromisesArray(delay, quantity, step).forEach(el => {
    setTimeout(() => {
      el.then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }, currentDelay);
    currentDelay += step;
  });
}

function readDataFromInputs() {
  delay = Number.parseInt(inputRefs.firstDelay.value);
  step = Number.parseInt(inputRefs.delayStep.value);
  quantity = Number.parseInt(inputRefs.amount.value);
}

function toggleButton() {
  btnSubmitRef.setAttribute('disabled', 'disabled');

  setTimeout(() => {
    clearInputs();
    btnSubmitRef.removeAttribute('disabled');
  }, delay + step * (quantity - 1));
}

function clearInputs() {
  const allInputsRefs = [...document.querySelectorAll('input')];

  allInputsRefs.forEach(el => {
    el.value = '';
  });
}

function createPromisesArray(delay, quantity, step) {
  const promisesArray = [];
  for (let i = 1; i <= quantity; i++) {
    promisesArray.push(createPromise(i, delay));
    delay += step;
  }

  return promisesArray;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
