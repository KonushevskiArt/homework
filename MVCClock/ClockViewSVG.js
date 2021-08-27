import {createOtions} from './viewCreateOptions.js';

const checkNeedZero = (num) => {
  return Number(num) > 9 ? num : `0${num}`;
} 
 
export class ClockViewSVG {
  constructor(parentEl, UTCOffset, size = 400) {
    this.parentEl = parentEl;
    this.UTCOffset = UTCOffset;
    this.size = size;
    this.wrapper = null;

    this.centralNumbers = null;
    this.arrowHoursEl = null;
    this.arrowMinutesEl = null;
    this.arrowSecondsEl = null;
  }
  createView = () => {
    const size = this.size;

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    this.wrapper = wrapper;
    this.parentEl.appendChild(wrapper);
    
    createOtions(wrapper, this.UTCOffset);

    const clock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    clock.classList.add('clock');
    clock.setAttribute('width', size);
    clock.setAttribute('height', size);
    clock.setAttribute('xmls', 'http://www.w3.org/2000/svg');
    
    const viewClock = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    viewClock.setAttribute('cx', size/2);
    viewClock.setAttribute('cy', size/2);
    viewClock.setAttribute('r', size/2);
    viewClock.setAttribute('fill', 'rgb(207, 167, 57)');
    clock.appendChild(viewClock);
    wrapper.appendChild(clock);

    const clockSizes = clock.getBoundingClientRect();
    const clockCenterX = clockSizes.width / 2;
    const clockCenterY = clockSizes.height / 2;
    const radiusToDigit = parseFloat((size / 2) * 0.8); // 80% от радиуса 
    const radius = size / 2;
    let digitCenterY = null;
    let digitCenterX = null;
    let angle = null;

    for (let i = 12; i > 0; i--) {
      angle = parseFloat(i * 30) / 180 * Math.PI; // 360 / 12 = 30 - один сектор
      digitCenterX = clockCenterX + radiusToDigit * Math.sin(angle);
      digitCenterY = clockCenterY - radiusToDigit * Math.cos(angle);
  
      const digit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      digit.setAttribute('cx', digitCenterX);
      digit.setAttribute('cy', digitCenterY);
      digit.setAttribute('r', size * 0.06); // 6% от размера часов
      digit.setAttribute('fill', 'rgb(48, 184, 105)');
      clock.appendChild(digit);
  
      const digitText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      digitText.setAttribute('x', digitCenterX);
      digitText.setAttribute('y', digitCenterY);
      digitText.setAttribute('font-size', size * 0.055); // 5.5% от размера часов 
      digitText.setAttribute('text-anchor', "middle");
      digitText.setAttribute('alignment-baseline', "middle");
      digitText.style.fill = 'black';
      digitText.textContent = i;
      clock.appendChild(digitText);
    }
    const  wrapCentralNums = document.createElementNS("http://www.w3.org/2000/svg", "text");
    wrapCentralNums.setAttribute('x', clockCenterX);
    wrapCentralNums.setAttribute('y', radius * 0.55); // 55% радиуса 
    wrapCentralNums.setAttribute('font-size', size * 0.08); // 8% от размера часов
    wrapCentralNums.setAttribute('text-anchor', "middle")
    wrapCentralNums.setAttribute('class', "centralNumbers");
    wrapCentralNums.style.fill = 'black';
    wrapCentralNums.textContent = '00:00:00';
    clock.appendChild(wrapCentralNums);

    const createArrow = (height, width, className) => {
      const  arrow = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      arrow.setAttribute('class', className);
      arrow.setAttribute('x', clockCenterX - (width / 2));
      arrow.setAttribute('y', clockCenterY - height * 0.05); // 0.05 - небольшой выступ
      arrow.setAttribute('width', width);
      arrow.setAttribute('height', height);
      arrow.setAttribute('rx', 5); // скругление 
      arrow.setAttribute('ry', 5);
      arrow.setAttribute('fill', 'black');
      arrow.setAttribute('fill-opacity', '0.8');
      
      clock.appendChild(arrow);
    }
    
    createArrow(radius * 0.55, radius * 0.05, 'arrowHours'); // 50% - длина, 5% - ширина от радиуса
    createArrow(radius * 0.65, radius * 0.02, 'arrowMinutes');
    createArrow(radius * 0.75, radius * 0.01, 'arrowSeconds');

    this.centralNumbers = clock.querySelector('.centralNumbers');
    this.arrowHoursEl = clock.querySelector('.arrowHours');
    this.arrowMinutesEl = clock.querySelector('.arrowMinutes');
    this.arrowSecondsEl = clock.querySelector('.arrowSeconds');

    this.clockCenterX = this.clockCenterY = parseFloat(size / 2);
    
    this.arrowHoursEl.style.transformOrigin = (
      `${clockCenterX}px ${clockCenterY}px`);
    this.arrowMinutesEl.style.transformOrigin = (
      `${clockCenterX}px ${clockCenterY}px`);
    this.arrowSecondsEl.style.transformOrigin = (
      `${clockCenterX}px ${clockCenterY}px`);
  }

  update = (timeStamp) => {
    const hours = checkNeedZero(timeStamp.getHours());
    const minutes = checkNeedZero(timeStamp.getMinutes());
    const seconds = checkNeedZero(timeStamp.getSeconds());
  
    this.centralNumbers.textContent = `${hours}:${minutes}:${seconds}`;
  
    const hoursOnClock = hours > 12 ? hours - 12 : hours; 
    const hoursArrowDeg = hoursOnClock * 30 + minutes * 0.5 + 180; // 30 (360 / 12) - один час, 0.5 - одна минута, 180 - изменил начальное положение  
    const minutesArrowDeg = minutes * 6 + seconds * 0.1 + 180; // 6 (360 / 60) - одна минута, 0.1 = одна секунда, 180 - изменил начальное положение 
    const secondsArrowDeg =  seconds * 6 + 180; // 6 (360 / 60) - одна секунда, 180 - изменил начальное положение
  
    this.arrowSecondsEl.style.transform = `rotate(${secondsArrowDeg}deg)`;
    this.arrowMinutesEl.style.transform = `rotate(${minutesArrowDeg}deg)`;
    this.arrowHoursEl.style.transform = `rotate(${hoursArrowDeg}deg)`;
  }
}

