import {createOtions} from './viewCreateOptions.js';

const checkNeedZero = (num) => {
  return Number(num) > 9 ? num : `0${num}`;
}

export class ClockViewDOM {
  constructor(parentEl, UTCOffset, size = 400) {
    this.parentEl = parentEl;
    this.UTCOffset = UTCOffset;
    this.size = size;
    this.wrapper = null;

    this.hoursEl = null;
    this.minutesEl = null;
    this.secondsEl = null;
    this.arrowHoursEl = null;
    this.arrowMinutesEl = null;
    this.arrowSecondsEl = null;
  }
  
  createView = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    this.wrapper = wrapper;
    this.parentEl.appendChild(wrapper);
    
    createOtions(wrapper, this.UTCOffset);

    const clock = document.createElement('div');
    clock.classList.add('clock');
    clock.style.width = clock.style.height = this.size + 'px';
    clock.style.position = 'relative';
    wrapper.appendChild(clock);

    const clockCenterX = clock.offsetWidth / 2;
    const clockCenterY = clock.offsetHeight / 2;
    const radiusToDigit = parseFloat((this.size / 2) * 0.8); // 80% от радиуса 
    const radius = this.size / 2;
    let digitCenterY = null;
    let digitCenterX = null;
    let angle = null;

    for (let i = 12; i > 0; i--) {
      const digit = document.createElement('div');
      digit.classList.add('digit');
      digit.style.width = digit.style.height = this.size * 0.13 + 'px'; // 13% от размера часов
      digit.style.fontSize = Math.round(this.size * 0.05) + 'px'; // 5% от размера часов 
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
    wrapCentralNums.style.fontSize = Math.round(this.size * 0.08) + 'px'; // 8% от размера часов 
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
    
    createArrow(radius * 0.55, radius * 0.05, 'arrowHours'); // 50% длина 5% ширина от радиуса
    createArrow(radius * 0.65, radius * 0.02, 'arrowMinutes');
    createArrow(radius * 0.75, radius * 0.01, 'arrowSeconds');
    
    this.hoursEl = clock.querySelector('.hours');
    this.minutesEl = clock.querySelector('.minutes');
    this.secondsEl = clock.querySelector('.seconds');
    this.arrowHoursEl = clock.querySelector('.arrowHours');
    this.arrowMinutesEl = clock.querySelector('.arrowMinutes');
    this.arrowSecondsEl = clock.querySelector('.arrowSeconds');

    this.arrowHoursEl.style.transformOrigin = (
      `${parseFloat(this.arrowHoursEl.style.width) / 2}px 
      ${parseFloat(this.arrowHoursEl.style.height) * 0.94}px`
    ); // 0.94 коэффициент выступания
    this.arrowMinutesEl.style.transformOrigin = (
      `${parseFloat(this.arrowMinutesEl.style.width) / 2}px 
      ${parseFloat(this.arrowMinutesEl.style.height) * 0.94}px`
    );
    this.arrowSecondsEl.style.transformOrigin = (
      `${parseFloat(this.arrowSecondsEl.style.width) / 2}px 
      ${parseFloat(this.arrowSecondsEl.style.height) * 0.94}px`
    );
  }

  update = (timeStamp) => {
    const hours = timeStamp.getHours();
    const minutes = timeStamp.getMinutes();
    const seconds = timeStamp.getSeconds();
    
    this.hoursEl.textContent = checkNeedZero(hours);
    this.minutesEl.textContent = checkNeedZero(minutes);
    this.secondsEl.textContent = checkNeedZero(seconds);

    const hoursOnClock = hours > 12 ? hours - 12 : hours; 
    const hoursArrowDeg = hoursOnClock * 30 + minutes * 0.5; // 30 (360 / 12) - один час, 0.5 - одна минута
    const minutesArrowDeg = minutes * 6 + seconds * 0.1; // 6 (360 / 60) - одна минута, 0.1 = одна секунда 
    const secondsArrowDeg =  seconds * 6; // 6 (360 / 60) - одна секунда

    this.arrowSecondsEl.style.transform = `rotate(${secondsArrowDeg}deg)`;
    this.arrowMinutesEl.style.transform = `rotate(${minutesArrowDeg}deg)`;
    this.arrowHoursEl.style.transform = `rotate(${hoursArrowDeg}deg)`;
  }
}

