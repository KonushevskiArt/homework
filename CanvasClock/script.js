const wrapper = document.querySelector('.wrapper');

checkNeedZero = (num) => {
  return Number(num) > 9 ? num : `0${num}`;
} 

const drawClock = (cvs, size, time = new Date(1970, 0, 0)) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const clockCenter = clockRadius = size / 2;
  const radius = size / 2;

  const ctx = cvs.getContext('2d');
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
  centralNumbersText = `${checkNeedZero(hours)}:${checkNeedZero(minutes)}:${checkNeedZero(seconds)}`
  ctx.fillText(centralNumbersText, clockCenter, radiusToCentralNumber);

  const createArrow = (height, width, deg) => {
    angleEnd = parseFloat(deg) / 180 * Math.PI; 
    angleStart = parseFloat(deg) / 180 * Math.PI; 
    const offset = height / 20;
    endOfArrowX = clockCenter + height * Math.sin(angleEnd);
    endOfArrowY = clockCenter - height * Math.cos(angleEnd);
    startOfArrayX = clockCenter - offset * Math.sin(angleStart);
    startOfArrayY = clockCenter + offset * Math.cos(angleStart);
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

  createArrow(radius * 0.5, radius * 0.05, hoursArrowDeg); // 50%(0.5) - длина, 5%(0.05) - ширина от радиуса
  createArrow(radius * 0.65, radius * 0.02, minutesArrowDeg);
  createArrow(radius * 0.74, radius * 0.01, secondsArrowDeg);
}

const createView = (size, parentEl) => {
  const cvs = document.createElement("canvas");
  cvs.width = cvs.height = size;
  cvs.classList.add('clock');
  parentEl.appendChild(cvs);

  drawClock(cvs, size);
  return cvs;
}

const init = (cvs, size) => {

  const update = () => {
    const time = new Date();
    drawClock(cvs, size, time);
    setTimeout(update, 1000 - new Date().getMilliseconds());
    console.log('sd')
  }
  
  update();
}

const createClock = (size, parentEl) => {
  const cvs = createView(size, parentEl);
  init(cvs, size);
}

createClock(300, wrapper); // 300 разер в px
// createClock(400, wrapper);
// createClock(200, wrapper); 
