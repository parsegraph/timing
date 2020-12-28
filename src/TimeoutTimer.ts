import Method from 'parsegraph-method';

export default class TimeoutTimer {
  _delay:number;
  timerId:any;
  fire:Function;
  listener:Method;

  constructor() {
    this._delay = 0;

    this.timerId = null;

    /**
     * Forwards event arguments to the listener.
     */
    this.fire = (...args:any):any=>{
      this.timerId = null;
      if (this.listener) {
        return this.listener.apply(args);
      }
    };
  }

  setDelay(ms:number):void {
    this._delay = ms;
  };

  delay():number {
    return this._delay;
  };

  schedule() {
    if (this.timerId) {
      return;
    }

    this.timerId = window.setTimeout(this.fire, this.delay());
  };

  setListener(listener:Function, thisArg?:any):void {
    if (!listener) {
      this.listener = null;
      return;
    }
    if (!thisArg) {
      thisArg = this;
    }
    this.listener = new Method(listener, thisArg);
  };

  scheduled():boolean {
    return !!this.timerId;
  };

  isScheduled():boolean {
    return this.scheduled();
  }

  cancel() {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
};
