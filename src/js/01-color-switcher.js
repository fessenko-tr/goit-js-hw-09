import getRandomHexColor from './random-color';

const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

let invervalId = null;

startBtnRef.addEventListener('click', startColorSwitching);

stopBtnRef.addEventListener('click', stopColorSwitching);

function startColorSwitching(e) {
  toggleButtons();
  invervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorSwitching() {
  toggleButtons();
  clearInterval(invervalId);
}

function toggleButtons() {
  document.querySelectorAll('button').forEach(el => {
    el.toggleAttribute('disabled');
  });
}
