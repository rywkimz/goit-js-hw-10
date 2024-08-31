import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Selectarea elementelor din DOM
const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const datetimePicker = document.querySelector('#datetime-picker');

let countdownInterval = null;
let selectedDate = null;

// Configurarea flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

// Funcția de conversie a milisecundelor în zile, ore, minute și secunde
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Funcția care adaugă un zero la începutul valorilor de o cifră
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Funcția de actualizare a interfeței
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Funcția de pornire a cronometrului
function startCountdown() {
  startButton.disabled = true;
  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      alert('Countdown finished!');
    } else {
      const timeLeft = convertMs(timeDifference);
      updateTimerDisplay(timeLeft);
    }
  }, 1000);
}

// Event listener pentru butonul Start
startButton.addEventListener('click', startCountdown);
startButton.disabled = true;
