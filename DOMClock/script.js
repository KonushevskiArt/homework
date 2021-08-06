const wrapper = document.querySelector('.wrapper');

checkNeedZero = (num) => {
  return Number(num) > 9 ? num : `0${num}`;
} 

const createView = (size, parentEl) => {
  const clock = document.createElement('div');
  clock.classList.add('clock');
  clock.style.width = clock.style.height = size + 'px';
  clock.style.position = 'relative';
  parentEl.appendChild(clock);

  const clockCenterX = clock.offsetWidth / 2;
  const clockCenterY = clock.offsetHeight / 2;
  const radiusToDigit = parseFloat((size / 2) * 0.8); // 80% от радиуса 
  const radius = size / 2;
  let digitCenterY = null;
  let digitCenterX = null;
  let angle = null;

  for (let i = 12; i > 0; i--) {
    const digit = document.createElement('div');
    digit.classList.add('digit');
    digit.style.width = digit.style.height = size * 0.13 + 'px'; // 13% от размера часов
    digit.style.fontSize = Math.round(size * 0.05) + 'px'; // 5% от размера часов 
    digit.style.position = 'absolute';
    clock.appendChild(digit);
    angle = parseFloat(i * 30) / 180 * Math.PI; // 360 / 12 = 30 - один сектор

    digitCenterX = clockCenterX + radiusToDigit * Math.sin(angle);
    digitCenterY = clockCenterY - radiusToDigit * Math.cos(angle);
    
    digit.style.left = Math.round(digitCenterX - digit.offsetWidth/2) + 'px'; 
    digit.style.top = Math.round(digitCenterY - digit.offsetHeight/2) + 'px';
    digit.textContent = i;
  }

  const wrapCentralNums = document.createElement('div');
  wrapCentralNums.classList.add('centralNumbers');
  wrapCentralNums.style.position = 'absolute';
  wrapCentralNums.style.fontSize = Math.round(size * 0.08) + 'px'; // 8% от размера часов 
  wrapCentralNums.innerHTML = (`
    <span class="hours">00</span>:
    <span class="minutes">00</span>:
    <span class="seconds">00</span>  
  `);
  
  clock.appendChild(wrapCentralNums);
  wrapCentralNums.style.top = clockCenterY - radius * 0.55 + 'px'; // 50% радиуса
  wrapCentralNums.style.left =  clockCenterX - wrapCentralNums.offsetWidth / 2  + 'px';
  

  const createArrow = (height, width, className) => {
    const arrow = document.createElement('div');
    arrow.classList.add('arrow', className);
    arrow.style.width = width + 'px';
    arrow.style.height = height + 'px';
    arrow.style.position = 'absolute';
    arrow.style.opacity = 0.8;
    arrow.style.left = clockCenterX - (width / 2) + 'px';
    arrow.style.bottom = clockCenterY - height * 0.05 + 'px'; // 0.05 небольшой выступ
    clock.appendChild(arrow);
  }
  
  createArrow(radius * 0.5, radius * 0.05, 'arrowHours'); // 50% длина 5% ширина от радиуса
  createArrow(radius * 0.8, radius * 0.02, 'arrowMinutes');
  createArrow(radius * 0.93, radius * 0.01, 'arrowSeconds');

  return clock;
}

const init = (clock) => {
  const hoursEl = clock.querySelector('.hours');
  const minutesEl = clock.querySelector('.minutes');
  const secondsEl = clock.querySelector('.seconds');
  const arrowHoursEl = clock.querySelector('.arrowHours');
  const arrowMinutesEl = clock.querySelector('.arrowMinutes');
  const arrowSecondsEl = clock.querySelector('.arrowSeconds');
  

  arrowHoursEl.style.transformOrigin = `${parseFloat(arrowHoursEl.style.width) / 2}px 
                                        ${parseFloat(arrowHoursEl.style.height) * 0.94}px`; // 0.94 коэффициент выступания
  arrowMinutesEl.style.transformOrigin = `${parseFloat(arrowMinutesEl.style.width) / 2}px 
                                          ${parseFloat(arrowMinutesEl.style.height) * 0.94}px`;
  arrowSecondsEl.style.transformOrigin = `${parseFloat(arrowSecondsEl.style.width) / 2}px 
                                          ${parseFloat(arrowSecondsEl.style.height) * 0.94}px`;

  const update = () => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    hoursEl.textContent = checkNeedZero(hours);
    minutesEl.textContent = checkNeedZero(minutes);
    secondsEl.textContent = checkNeedZero(seconds);

    const hoursOnClock = hours > 12 ? hours - 12 : hours; 
    const hoursArrowDeg = hoursOnClock * 30 + minutes * 0.5; // 30 (360 / 12) - один час, 0.5 - одна минута
    const minutesArrowDeg = minutes * 6 + seconds * 0.1; // 6 (360 / 60) - одна минута, 0.1 = одна секунда 
    const secondsArrowDeg =  seconds * 6; // 6 (360 / 60) - одна секунда

    arrowSecondsEl.style.transform = `rotate(${secondsArrowDeg}deg)`;
    arrowMinutesEl.style.transform = `rotate(${minutesArrowDeg}deg)`;
    arrowHoursEl.style.transform = `rotate(${hoursArrowDeg}deg)`;
  }
  
  setInterval(update, 1000);
  update();
}

const createClock = (size, parentEl) => {
 
  const clock = createView(size, parentEl);
  init(clock);
}

createClock(300, wrapper); // 300 разер в px
createClock(400, wrapper);
createClock(200, wrapper); 
