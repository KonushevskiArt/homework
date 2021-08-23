import {createState} from './data.js';
import {createView} from './view.js';
import {gameController} from './controller.js';

const parentEl = document.querySelector('.wrapper');
const size = 400;

const state = createState(size, parentEl);

createView(state);

gameController(state);