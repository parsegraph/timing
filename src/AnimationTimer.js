export default function AnimationTimer() {
  this.timerId = null;

  const that = this;
  this.fire = function(...args) {
    that.timerId = null;
    if (that.listener) {
      try {
        return that.listener[0].apply(that.listener[1], args);
      } catch (ex) {
        console.log(ex);
        alert('Error during timer: ' + ex);
      }
    }
  };
}

AnimationTimer.prototype.schedule = function() {
  // Do nothing if the timer is already scheduled.
  if (this.timerId) {
    return false;
  }

  // console.log(new Error("Scheduling animation timer."));
  this.timerId = requestAnimationFrame(this.fire);
  return true;
};

AnimationTimer.prototype.setListener = function(listener, thisArg) {
  if (!listener) {
    this.listener = null;
    return;
  }

  this.listener = [listener, thisArg];
};

AnimationTimer.prototype.scheduled = function() {
  return !!this.timerId;
};
AnimationTimer.prototype.isScheduled = AnimationTimer.prototype.scheduled;

AnimationTimer.prototype.cancel = function() {
  if (!this.timerId) {
    return;
  }

  cancelAnimationFrame(this.timerId);
  this.timerId = null;
};

