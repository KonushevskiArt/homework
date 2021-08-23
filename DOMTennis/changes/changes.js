import { ballChanges } from "./ballChanges.js";
import { playersChanges } from "./playersChanges.js";

export const changes = (data, movement) => {
  playersChanges(data, movement);
  if (data.isGameOn) {
    ballChanges(data);
  }
}