export const playersChanges = (data, movement) => {
  const {
    firstPlayerTopSide, 
    firstPlayerDownSide, 
    secondPlayerTopSide, 
    secondPlayerDownSide,
  } = data.playersPositions;
 
  const {playersPositions, speedPlayers} = data;

  const {
    moveLimitUp,
    moveLimitDown,
  } = data.viewOptions;
  
  if (movement.player1Up && firstPlayerTopSide > moveLimitUp) {
    playersPositions.firstPlayerTopSide -= speedPlayers;
    playersPositions.firstPlayerDownSide -= speedPlayers;
  }
  if (movement.player1Down && firstPlayerDownSide < moveLimitDown) {
    playersPositions.firstPlayerTopSide += speedPlayers;
    playersPositions.firstPlayerDownSide += speedPlayers;
  }
  if (movement.player2Up && secondPlayerTopSide > moveLimitUp) {
    playersPositions.secondPlayerTopSide -= speedPlayers;
    playersPositions.secondPlayerDownSide -= speedPlayers;
  }
  if (movement.player2Down && secondPlayerDownSide < moveLimitDown) {
    playersPositions.secondPlayerTopSide += speedPlayers;
    playersPositions.secondPlayerDownSide += speedPlayers;
  }
}