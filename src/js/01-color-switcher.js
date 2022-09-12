const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

let timerId = null;
function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.setAttribute('disabled', 'true');
  refs.stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.bodyEl.style.backgroundColor = randomColor;
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  refs.stopBtn.setAttribute('disabled', 'true');
  refs.startBtn.removeAttribute('disabled');
  clearInterval(timerId);
})










