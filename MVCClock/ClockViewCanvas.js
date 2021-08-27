import {createOtions} from './viewCreateOptions.js';

const checkNeedZero = (num) => {
  return Number(num) > 9 ? num : `0${num}`;
} 

export class ClockViewCanvas {
  constructor(parentEl, UTCOffset, size = 400) {
    this.parentEl = parentEl;
    this.UTCOffset = UTCOffset;
    this.size = size;
    this.cvs = null;
    this.wrapper = null;

    //
    this.centralNumbers = null;
    this.arrowHoursEl = null;
    this.arrowMinutesEl = null;
    this.arrowSecondsEl = null;
  }
 
  drawClock = (time = new Date(1970, 0, 0)) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const size = this.size;

    const clockCenter  = size / 2;
    const clockRadius = clockCenter;
    const radius = size / 2;

    const ctx = this.cvs.getContext('2d');//// this.ctx ?

    ctx.fillStyle = 'rgb(207, 167, 57)';

    ctx.beginPath();
    ctx.arc(clockCenter, clockCenter, clockRadius, 0, Math.PI*2, false);
    ctx.fill();

    const radiusToDigit = parseFloat(radius * 0.8); // 80% от радиуса 
    const radiusToCentralNumber = clockCenter - size / 4.5; 
    let digitCenterY = null;
    let digitCenterX = null;
    let angle = null;
    const digitSize = size * 0.06;
    const centerNumberSize = size * 0.08;
    const digitNumberSize = size * 0.055;

    for (let i = 12; i > 0; i--) {
      angle = parseFloat(i * 30) / 180 * Math.PI; // 360 / 12 = 30 - один сектор
      digitCenterX = clockCenter + radiusToDigit * Math.sin(angle);
      digitCenterY = clockCenter - radiusToDigit * Math.cos(angle);
  
      ctx.fillStyle = 'rgb(48, 184, 105)';
      ctx.beginPath();
      ctx.arc(digitCenterX, digitCenterY, digitSize, 0, Math.PI*2, false);
      ctx.fill();
  
      ctx.fillStyle = 'black';
      ctx.font = `${digitNumberSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i}`, digitCenterX, digitCenterY);
    }
    ctx.fillStyle = 'black';
    ctx.font = `${centerNumberSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const centralNumbersText = `${checkNeedZero(hours)}:${checkNeedZero(minutes)}:${checkNeedZero(seconds)}`
    ctx.fillText(centralNumbersText, clockCenter, radiusToCentralNumber);

    const createArrow = (height, width, deg) => {
      const angleEnd = parseFloat(deg) / 180 * Math.PI; 
      const angleStart = parseFloat(deg) / 180 * Math.PI; 
      const offset = height / 20;
      const endOfArrowX = clockCenter + height * Math.sin(angleEnd);
      const endOfArrowY = clockCenter - height * Math.cos(angleEnd);
      const startOfArrayX = clockCenter - offset * Math.sin(angleStart);
      const startOfArrayY = clockCenter + offset * Math.cos(angleStart);
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(0,0,0, 0.8)';
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(startOfArrayX, startOfArrayY); 
      ctx.lineTo(endOfArrowX, endOfArrowY);
      ctx.stroke();
    }
    const hoursOnClock = hours > 12 ? hours - 12 : hours; 
    const hoursArrowDeg = hoursOnClock * 30 + minutes * 0.5; // 30 (360 / 12) - один час, 0.5 - одна минута
    const minutesArrowDeg = minutes * 6 + seconds * 0.1; // 6 (360 / 60) - одна минута, 0.1 = одна секунда
    const secondsArrowDeg =  seconds * 6; // 6 (360 / 60) - одна секунда 
  
    createArrow(radius * 0.55, radius * 0.05, hoursArrowDeg); // 50%(0.5) - длина, 5%(0.05) - ширина от радиуса
    createArrow(radius * 0.65, radius * 0.02, minutesArrowDeg);
    createArrow(radius * 0.74, radius * 0.01, secondsArrowDeg);
  }
  createView = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    this.wrapper = wrapper;
    this.parentEl.appendChild(wrapper);
    
    createOtions(wrapper, this.UTCOffset);

    this.cvs = document.createElement("canvas");
    this.cvs.width = this.cvs.height = this.size;
    this.cvs.classList.add('clock');
    this.wrapper.appendChild(this.cvs);

    this.drawClock();
  }

  update = (timeStamp) => {
    this.drawClock(timeStamp);
  }
}
