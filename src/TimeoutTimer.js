export default function TimeoutTimer() {
  this.delay = 0;

  this.timerId = null;

  /**
   * Forwards event arguments to the listener.
   */
  const that = this;
  this.fire = function(...args) {
    that.timerId = null;
    if (that.listener) {
      return that.listener[0].apply(that.listener[1], args);
    }
  };
}

TimeoutTimer.prototype.setDelay = function(ms) {
  this.delay = ms;
};

TimeoutTimer.prototype.delay = function() {
  return this.delay;
};

TimeoutTimer.prototype.schedule = function() {
  if (this.timerId) {
    return;
  }

  this.timerId = window.setTimeout(this.fire, this.delay);
};

TimeoutTimer.prototype.setListener = function(listener, thisArg) {
  if (!listener) {
    this.listener = null;
    return;
  }
  if (!thisArg) {
    thisArg = this;
  }
  this.listener = [listener, thisArg];
};

TimeoutTimer.prototype.scheduled = function() {
  return !!this.timerId;
};
TimeoutTimer.prototype.isScheduled = TimeoutTimer.prototype.scheduled;

TimeoutTimer.prototype.cancel = function() {
  if (this.timerId) {
    window.clearTimeout(this.timerId);
    this.timerId = null;
  }
};

