import {changes} from './changes/changes.js';
import { updateView } from './view.js';

export const gameController = (data) => {
  const start = data.viewOptions.parentEl.querySelector('.start');
  const {ballPosition, playersPositions} = data;

  start.onclick = () => {
    if (!data.isGameOn) {
      data.isGameOn = true;

      ballPosition.ballLeftSide = ballPosition.ballStartleftSide; 
      ballPosition.ballTopSide = ballPosition.ballStartTopSide;
      ballPosition.ballRightSide = ballPosition.ballStartRightSide;
      ballPosition.ballDownSide = ballPosition.ballStartDownSide;

      playersPositions.firstPlayerTopSide = playersPositions.firstPlayerStartTopSide;
      playersPositions.firstPlayerDownSide = playersPositions.firstPlayerStartDownSide;
      playersPositions.secondPlayerTopSide = playersPositions.secondPlayerStartTopSide;
      playersPositions.secondPlayerDownSide = playersPositions.secondPlayerStartDownSide;

      data.speedBallX = Math.random() > 0.5 ? 2 : -2;
      data.speedPlayers = 2;
    }
  }

  const movement = {
    player1Up: false,
    player1Down: false,
    player2Up: false,
    playesr2Down: false
  }

  const changeMovement = (e, value) => {
    switch (e.key) {
      case 'Shift':
        movement.player1Up = value;
        break;
      case 'Control':
        movement.player1Down = value;
        break;
      case 'ArrowUp':
        movement.player2Up = value;
        break;
      case 'ArrowDown':
        movement.player2Down = value;
        break;
    }
  }

  const saveKeyPress = (e) => {
    changeMovement(e, true);
  }
  const removeKeyPress = (e) => {
    changeMovement(e, false);
  }

  window.addEventListener('keydown', saveKeyPress)
  window.addEventListener('keyup', removeKeyPress)
 
  const gameLoop = (data) => {
    changes(data, movement);
    updateView(data);
    requestAnimationFrame(() => gameLoop(data));
  }
  gameLoop(data);
}