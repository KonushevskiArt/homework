export const createOtions = (parentEl, UTCOffset) => {
  const btnStart = document.createElement('button');
  const btnStop = document.createElement('button');
  btnStart.classList.add('start');
  btnStop.classList.add('stop');
  btnStart.textContent = 'старт';
  btnStop.textContent = 'стоп';
  parentEl.appendChild(btnStop);
  parentEl.appendChild(btnStart);

  const GMTText = document.createElement('span');
  GMTText.classList.add('GMTText');
  GMTText.textContent = UTCOffset;
  parentEl.appendChild(GMTText);
}