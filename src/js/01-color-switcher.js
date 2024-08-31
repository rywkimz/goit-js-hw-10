const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let colorChangeInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function startColorSwitch() {
  startButton.disabled = true;

  colorChangeInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorSwitch() {
  clearInterval(colorChangeInterval);

  startButton.disabled = false;
}

startButton.addEventListener('click', startColorSwitch);
stopButton.addEventListener('click', stopColorSwitch);
