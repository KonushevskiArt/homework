import { Clock } from "./model.js";
import { ClockControllerButtons } from "./ClockControllerButtons.js";
import { ClockViewSVG } from "./clockViewSVG.js";
import { ClockViewDOM } from "./clockViewDOM.js";
import { ClockViewCanvas } from "./clockViewCanvas.js";

const parent = document.querySelector('.parent');

const UTCOffset1 = '-5';  // UTC -5
const clock1 = new Clock(UTCOffset1);
const view1 = new ClockViewDOM(parent, `Нью-Йорк (GMT ${UTCOffset1})`, 250); // 250 size
const controller1 = new ClockControllerButtons(clock1, view1);

controller1.init();

const UTCOffset2 = ''; // UTC 0
const clock2 = new Clock(UTCOffset2);
const view2 = new ClockViewSVG(parent, `Лондон (GMT ${UTCOffset2})`, 250);
const controller2 = new ClockControllerButtons(clock2, view2);

controller2.init();

const UTCOffset3 = '+1'; // UTC +1
const clock3 = new Clock(UTCOffset3);
const view3 = new ClockViewCanvas(parent, `Берлин (GMT ${UTCOffset3})`, 250);
const controller3 = new ClockControllerButtons(clock3, view3);

controller3.init();

const UTCOffset4 = '+3';  // UTC +3
const clock4 = new Clock(UTCOffset4);
const view4 = new ClockViewDOM(parent, `Минск (GMT ${UTCOffset4})`, 250); // 250 size
const controller4 = new ClockControllerButtons(clock4, view4);

controller4.init();

const UTCOffset5 = '+9'; // UTC +9
const clock5 = new Clock(UTCOffset5);
const view5 = new ClockViewSVG(parent, `Токио (GMT ${UTCOffset5})`, 250);
const controller5 = new ClockControllerButtons(clock5, view5);

controller5.init();

const UTCOffset6 = '+10'; // UTC +10
const clock6 = new Clock(UTCOffset6);
const view6 = new ClockViewCanvas(parent, `Владивосток (GMT ${UTCOffset6})`, 250);
const controller6 = new ClockControllerButtons(clock6, view6);

controller6.init();