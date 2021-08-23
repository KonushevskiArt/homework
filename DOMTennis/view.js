export const createView = (data) => {
  const {viewOptions, ballPosition, playersPositions} = data;
  const {playerHeight, playerWidth, ballHeight, playGroundHeight, playGroundWidth, parentEl} = viewOptions;
  const centerPlayGraundX = parentEl.offsetLeft + playGroundWidth / 2;

  const button = document.createElement('button');
  button.classList.add('start');
  button.style.fontSize = '16px';
  button.style.marginBottom = '5px';
  button.textContent = 'Start';
  parentEl.appendChild(button);

  const score = document.createElement('div');
  score.style.position = 'absolute';
  score.textContent = '0:0';
  score.classList.add('score');
  score.style.fontSize = '28px';
  score.style.top = parentEl.offsetTop + 'px';
  parentEl.appendChild(score);
  score.style.left = centerPlayGraundX - score.offsetWidth / 2 + 'px';

  const playGround = document.createElement('div');
  playGround.classList.add('playGround');
  playGround.style.width = playGroundWidth + 'px';
  playGround.style.height = playGroundHeight + 'px';
  playGround.style.backgroundColor = '#ece276';
  playGround.style.border = '1px solid black'
  parentEl.appendChild(playGround);

  const createPlayer = (playerNum) => {
    const player = document.createElement('div');
    player.classList.add(playerNum === 'first' ? 'firstPlayer': 'secondPlayer');
    player.style.width = playerWidth + 'px';
    player.style.height = playerHeight + 'px';
    player.style.transform = 'translateZ(0)';
    player.style.backgroundColor = playerNum === 'first' ? '#29A266': '#2929A2';
    player.style.position = 'absolute';
    player.style.top = playGround.offsetTop + playGroundHeight / 2 - playerHeight / 2 + 'px';
    player.style.left = playerNum === 'first' 
                        ? playGround.offsetLeft + 'px'
                        : playGroundWidth + playGround.offsetLeft - playerWidth + 'px';
    playGround.appendChild(player);
    return player;
  }
  const player1 = createPlayer('first');
  const player2 = createPlayer('second');

  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.width = ballHeight + 'px';
  ball.style.height = ballHeight + 'px';
  ball.style.backgroundColor = '#CF4D4D';
  ball.style.borderRadius = '50%';
  ball.style.position = 'absolute';
  ball.style.top = playGround.offsetTop + playGroundHeight / 2 - ballHeight / 2 + 'px';
  ball.style.left = centerPlayGraundX - ballHeight / 2 + 'px';
  playGround.appendChild(ball);

  viewOptions.moveLimitUp = playGround.offsetTop;
  viewOptions.moveLimitDown = viewOptions.moveLimitUp + (playGround.offsetHeight);
  viewOptions.borderPlayGroundLeft = playGround.offsetLeft;
  viewOptions.borderPlayGroundRight = playGround.offsetLeft + playGround.offsetWidth;

  playersPositions.firstPlayerTopSide = parseFloat(player1.style.top);
  playersPositions.firstPlayerDownSide = playersPositions.firstPlayerTopSide + playerHeight;
  playersPositions.secondPlayerTopSide = parseFloat(player2.style.top);
  playersPositions.secondPlayerDownSide = playersPositions.secondPlayerTopSide + playerHeight;
  playersPositions.firstPlayerRighSide = viewOptions.borderPlayGroundLeft + playerWidth;
  playersPositions.secondPlayerLeftSide = viewOptions.borderPlayGroundRight - playerWidth;

  playersPositions.firstPlayerStartTopSide = playersPositions.firstPlayerTopSide;
  playersPositions.firstPlayerStartDownSide =   playersPositions.firstPlayerDownSide;
  playersPositions.secondPlayerStartTopSide = playersPositions.secondPlayerTopSide;
  playersPositions.secondPlayerStartDownSide = playersPositions.secondPlayerDownSide;

  ballPosition.ballTopSide = ball.offsetTop;
  ballPosition.ballDownSide = ballPosition.ballTopSide + ball.offsetHeight;
  ballPosition.ballLeftSide = parseFloat(ball.style.left);
  ballPosition.ballRightSide =  ballPosition.ballLeftSide + ball.offsetWidth;

  ballPosition.ballStartTopSide = ballPosition.ballTopSide;
  ballPosition.ballStartDownSide = ballPosition.ballDownSide;
  ballPosition.ballStartleftSide = ballPosition.ballLeftSide;
  ballPosition.ballStartRightSide = ballPosition.ballRightSide;
}

export const updateView = (data) => {
  const {parentEl} = data.viewOptions;
  const {
    firstPlayerTopSide,
    secondPlayerTopSide,
  } = data.playersPositions;

  const {
    scorePlayer1,
    scorePlayer2,
  } = data;

  const {
    ballLeftSide,
    ballTopSide,
  } = data.ballPosition;

  const score = parentEl.querySelector('.score');
  const player1 = parentEl.querySelector('.firstPlayer');
  const player2 = parentEl.querySelector('.secondPlayer');
  const ball = parentEl.querySelector('.ball');

  const playersUpdate = () => {
    player1.style.top = firstPlayerTopSide + 'px';
    player2.style.top = secondPlayerTopSide + 'px';
  }
  const ballUpdate = () => {
    ball.style.top = ballTopSide + 'px';
    ball.style.left = ballLeftSide + 'px';
  }
  const scoreUpdate = () => {
    score.textContent = `${scorePlayer1}:${scorePlayer2}`;
  }

  playersUpdate();
  ballUpdate();
  scoreUpdate();
}
