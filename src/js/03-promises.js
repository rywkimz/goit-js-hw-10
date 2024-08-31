document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.target.delay.value);
  const step = Number(event.target.step.value);
  const amount = Number(event.target.amount.value);

  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + step * (i - 1);
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
