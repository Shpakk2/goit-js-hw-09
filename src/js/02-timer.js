import flatpickr from "flatpickr";
import { Notify } from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";
const startBtn = document.querySelector('button')
const input = document.querySelector('input')
const textDays = document.querySelector('[data-days]')
const textHours = document.querySelector('[data-hours]')
const textMinutes = document.querySelector('[data-minutes]')
const textSeconds = document.querySelector('[data-seconds]')

startBtn.disabled = true

let finishTime = 0

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
          Notify.failure("Please choose a date in the future");
        } else {
            startBtn.disabled = false
            finishTime = selectedDates[0].getTime()
            }
  },
};

flatpickr("#datetime-picker", options)

startBtn.addEventListener('click', startTimer)

function startTimer() {
    Notify.success("your timer has started")
    startBtn.disabled = true
    input.disabled = true
  const timerId =  setInterval(() => {
        const date = new Date();
      const timeDifference = finishTime - date.getTime()
      const counter = convertMs(timeDifference)
        if (timeDifference > 0) {
            textMaker(counter)
        } else {
            clearInterval(timerId)
            Notify.warning(`your time is up`)
        }
    
    }, 1000);
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

function textMaker({ days, hours, minutes, seconds }) {
    textDays.textContent = addLeadingZero(days)
    textHours.textContent = addLeadingZero(hours)
    textMinutes.textContent = addLeadingZero(minutes)
    textSeconds.textContent = addLeadingZero(seconds)
}

function addLeadingZero(value) {
  return  `${value}`.padStart(2, '0')
}