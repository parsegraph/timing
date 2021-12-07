import Method from "parsegraph-method";

export default class IntervalTimer {
  _delay: number;
  timerId: any;
  listener: Method;
  fire: Function;

  constructor() {
    this._delay = 0;

    this.timerId = null;

    /*
     * Forwards event arguments to the listener.
     */
    const that = this;
    this.fire = function (...args: any) {
      if (that.listener) {
        return that.listener.apply(args);
      }
    };
  }

  /**
   * Sets the delay, in milliseconds.
   */
  setDelay(ms: number): void {
    this._delay = ms;
  }

  /**
   * Gets the delay, in milliseconds.
   */
  delay(): number {
    return this._delay;
  }

  schedule() {
    if (this.timerId) {
      return;
    }

    this.timerId = window.setInterval(this.fire, this.delay());
  }

  scheduled(): boolean {
    return !!this.timerId;
  }

  isScheduled(): boolean {
    return this.isScheduled();
  }

  setListener(listener: Function, thisArg?: any): void {
    if (!listener) {
      this.listener = null;
      return;
    }
    if (!thisArg) {
      thisArg = this;
    }
    this.listener = new Method(listener, thisArg);
  }

  cancel() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
