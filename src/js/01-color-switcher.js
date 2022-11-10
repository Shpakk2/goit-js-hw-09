const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const bodyEl = startBtn.parentNode

let timerId = null

stopBtn.disabled = true

startBtn.addEventListener('click', startStyles)
stopBtn.addEventListener("click", stopStyles)

function startStyles() {
    startBtn.disabled = true
    stopBtn.disabled = false
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = `${getRandomHexColor()}`
  }, 1000);
}

function stopStyles() {
    startBtn.disabled = false
        stopBtn.disabled = true
    clearInterval(timerId)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
