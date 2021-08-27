export class Clock {
  constructor(UTCOffset) {
    this.UTCOffsetTime = +UTCOffset * 60 * 60 * 1000;
    this.stoppedTime = null;
    this.currentTime = null;
    this.showedTime = null;
    this.wasStoppedTime = false;
  }

  stopTime = () => {
    this.wasStoppedTime = true;
    this.stoppedTime = this.currentTime;
  }

  startTime = () => {
    this.wasStoppedTime = false;
  }

  countCurrentTimeWidthUTCOffset = () => {
    const nowTime = new Date();
    const offsetUTCNowTime = nowTime.getTimezoneOffset();
    const zeroTime = (nowTime.getTime() + (offsetUTCNowTime * 60 * 1000));
    
    this.currentTime = new Date(zeroTime + (this.UTCOffsetTime));
  }

  updateTime = () => {
    this.countCurrentTimeWidthUTCOffset();

    if (this.wasStoppedTime) {
      this.showedTime = this.stoppedTime;  
    } else {
      this.showedTime = this.currentTime;
    }
  }
}