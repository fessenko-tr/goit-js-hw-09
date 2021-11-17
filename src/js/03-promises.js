import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRefs = {
  fisrtDelay: document.querySelector('[name=delay]'),
  delayStep: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
};

const btnSubmitRef = document.querySelector('button');

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const setup = { position, delay };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(setup);
      } else {
        reject(setup);
      }
    }, delay);
  });
}
