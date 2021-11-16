import getRandomHexColor from './random-color';

const startBtnReff = document.querySelector('[data-start]');
const stopBtnReff = document.querySelector('[data-stop]');

let isActive = false;
let invervalId = null;

startBtnReff.addEventListener('click', () => {
  if (!isActive) {
    startColorSwitching();
  }
});

stopBtnReff.addEventListener('click', () => {
  if (isActive) {
    stopColorSwitching();
  }
});

function startColorSwitching(e) {
  isActive = true;
  toggleOpacity();
  invervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorSwitching() {
  isActive = false;
  toggleOpacity();
  clearInterval(invervalId);
}

function toggleOpacity() {
  startBtnReff.classList.toggle('btn-opacity');
  stopBtnReff.classList.toggle('btn-opacity');
}
