export const ballChanges = (data) => {
  const {
    ballTopSide,
    ballDownSide, 
    ballLeftSide,
    ballRightSide, 
  } = data.ballPosition;

  const {
    moveLimitUp,
    moveLimitDown,
    borderPlayGroundLeft,
    borderPlayGroundRight,
    oneFourthPlayerHeight,
  } = data.viewOptions;

  const {
    firstPlayerRighSide,
    firstPlayerDownSide,
    firstPlayerTopSide,
    secondPlayerLeftSide,
    secondPlayerDownSide,
    secondPlayerTopSide,
  } = data.playersPositions;

  const {speedBallX, ballPosition} = data;

  const isBallTouchFirstPlayer = ballLeftSide <= firstPlayerRighSide - speedBallX
                              && (ballTopSide <= firstPlayerDownSide 
                              && ballDownSide >= firstPlayerTopSide);
  const isBallTouchSecondPlayer = ballRightSide >= secondPlayerLeftSide - speedBallX
                              && (ballTopSide <= secondPlayerDownSide 
                              && ballDownSide >= secondPlayerTopSide);

  const findOutWhichPartTouched = (playerTopSide, player) => {
    const differencesTopSides = playerTopSide - ballTopSide;
    let speedBallY = 0; 
    if (differencesTopSides > -oneFourthPlayerHeight) {
      speedBallY = Math.abs(data.speedBallX) / 4;
    } 
    else if (differencesTopSides > -(oneFourthPlayerHeight * 2)) {
      //
    } 
    else {
      speedBallY = -Math.abs(data.speedBallX) / 4;
    }
    data.speedBallY = speedBallY;
    data.speedBallX += player === 'first' ? -data.accelerationBall : data.accelerationBall;
  }  

  if (isBallTouchFirstPlayer) {
    findOutWhichPartTouched(firstPlayerTopSide, 'first');
  } 

  if (isBallTouchSecondPlayer) {
    findOutWhichPartTouched(secondPlayerTopSide, 'second');
  }                            

  const isBallTouchLeftBorder = ballLeftSide <= borderPlayGroundLeft;
  const isBallTouchRightBorder = ballRightSide >= borderPlayGroundRight;
  const isBallTouchTopBorder = ballTopSide <=  moveLimitUp;
  const isBallTouchBottomBorder = ballDownSide >=  moveLimitDown;

  if (isBallTouchLeftBorder || isBallTouchRightBorder) {
    data.scorePlayer1 += isBallTouchRightBorder ? 1 : 0;
    data.scorePlayer2 += isBallTouchLeftBorder ? 1 : 0; 
    data.speedBallX = 0;
    data.speedBallY = 0;
    data.speedPlayers = 0;
    data.isGameOn = false;

  } else if (isBallTouchFirstPlayer || isBallTouchSecondPlayer) {
    data.ballServe = isBallTouchFirstPlayer ? 'firstPlayer' : 'secondPlayer'; 
    data.speedBallX = -(data.speedBallX);
  }  else if (isBallTouchTopBorder || isBallTouchBottomBorder) {
    data.scorePlayer1 += data.ballServe === 'secondPlayer' ? 1 : 0;
    data.scorePlayer2 += data.ballServe === 'firstPlayer' ? 1 : 0; 
    data.speedBallX = 0;
    data.speedBallY = 0;
    data.speedPlayers = 0;
    data.isGameOn = false;
  }

  ballPosition.ballLeftSide += data.speedBallX; 
  ballPosition.ballTopSide += data.speedBallY;
  ballPosition.ballRightSide += data.speedBallX;
  ballPosition.ballDownSide += data.speedBallY;
}