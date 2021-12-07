import Method from "parsegraph-method";

export default class AnimationTimer {
  timerId: any;
  fire: FrameRequestCallback;
  listener: Method;

  constructor() {
    this.timerId = null;

    this.fire = (...args: any): any => {
      this.timerId = null;
      if (this.listener) {
        try {
          return this.listener.apply(args);
        } catch (ex) {
          console.log(ex);
          alert("Error during timer: " + ex);
        }
      }
    };
  }

  schedule(): boolean {
    // Do nothing if the timer is already scheduled.
    if (this.timerId) {
      return false;
    }

    // console.log(new Error("Scheduling animation timer."));
    this.timerId = requestAnimationFrame(this.fire);
    return true;
  }

  setListener(listener: Function, thisArg?: any): void {
    if (!listener) {
      this.listener = null;
      return;
    }

    this.listener = new Method(listener, thisArg);
  }

  scheduled(): boolean {
    return !!this.timerId;
  }

  isScheduled(): boolean {
    return this.scheduled();
  }

  cancel() {
    if (!this.timerId) {
      return;
    }

    cancelAnimationFrame(this.timerId);
    this.timerId = null;
  }
}
