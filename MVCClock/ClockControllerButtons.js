export class ClockControllerButtons {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init = () => {
    this.view.createView();

    const startBtn = this.view.wrapper.querySelector('.start');
    const stopBtn = this.view.wrapper.querySelector('.stop');

    startBtn.onclick = () => this.model.startTime();
    stopBtn.onclick = () => this.model.stopTime();

    this.update();
  }

  update = () => {
    this.model.updateTime();
    this.view.update(this.model.showedTime);
    setTimeout(this.update, 1000 - new Date().getMilliseconds());
  }

}  