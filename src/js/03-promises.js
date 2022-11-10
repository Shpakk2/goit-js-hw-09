import { Notify } from 'notiflix';
const form = document.querySelector('.form')
let timerId = null;
form.addEventListener("submit", onFormSubmit)

function onFormSubmit(e) {
  e.preventDefault()
  const {
    elements: { delay, step, amount }
  } = e.currentTarget;

  let delayValue = +delay.value
  
  for (let i = 1; i <= +amount.value; i += 1) {
      createPromise(i, delayValue)
  .then(value => {
    Notify.success(value);
  })
  .catch(value => {
    Notify.failure(value);
  });
      delayValue += (+step.value)
  }
  
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`)
    }
  }, delay)
  })
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });