export default function IntervalTimer() {
  this.delay = 0;

  this.timerId = null;

  /*
   * Forwards event arguments to the listener.
   */
  const that = this;
  this.fire = function(...args) {
    if (that.listener) {
      return that.listener[0].apply(that.listener[1], args);
    }
  };
}

/*
 * Sets the delay, in milliseconds.
 */
IntervalTimer.prototype.setDelay = function(ms) {
  this.delay = ms;
};

/*
 * Gets the delay, in milliseconds.
 */
IntervalTimer.prototype.delay = function() {
  return this.delay;
};

IntervalTimer.prototype.schedule = function() {
  if (this.timerId) {
    return;
  }

  this.timerId = window.setInterval(this.fire, this.delay);
};

IntervalTimer.prototype.scheduled = function() {
  return !!this.timerId;
};
IntervalTimer.prototype.isScheduled = IntervalTimer.prototype.scheduled;

IntervalTimer.prototype.setListener = function(listener, thisArg) {
  if (!listener) {
    this.listener = null;
    return;
  }
  if (!thisArg) {
    thisArg = this;
  }
  this.listener = [listener, thisArg];
};

IntervalTimer.prototype.cancel = function() {
  if (this.timerId) {
    window.clearInterval(this.timerId);
    this.timerId = null;
  }
};

