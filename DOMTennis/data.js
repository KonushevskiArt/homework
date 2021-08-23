export const createState = (size, parentEl) => {
  return {
    scorePlayer1: 0,
    scorePlayer2: 0,
    ballServe: null,
    isGameOn: false,
    speedBallY: 0,
    speedBallX: 0,
    speedPlayers: 2,
    accelerationBall: 0.2,

    viewOptions: {
      parentEl,
      playGroundWidth: size,
      playGroundHeight: size * 0.75,
      playerHeight: size / 16 * 4,
      oneFourthPlayerHeight: size / 16, 
      playerWidth: size / 40,
      ballHeight: size / 16,

      moveLimitUp: null,
      moveLimitDown: null,
      borderPlayGroundLeft: null,
      borderPlayGroundRight: null,
    },

    playersPositions: {
      firstPlayerTopSide: null,
      firstPlayerDownSide: null,
      secondPlayerTopSide: null,
      secondPlayerDownSide: null,
      firstPlayerRighSide: null,
      secondPlayerLeftSide: null,

      firstPlayerStartTopSide: null,
      firstPlayerStartDownSide: null,
      secondPlayerStartTopSide: null,
      secondPlayerStartDownSide: null,
    },

    ballPosition: {
      ballStartTopSide: null,
      ballStartDownSide: null,
      ballStartleftSide: null,
      ballStartRightSide: null,

      ballTopSide: null,
      ballDownSide: null,
      ballLeftSide: null,
      ballRightSide:  null,
    }
  }
}
