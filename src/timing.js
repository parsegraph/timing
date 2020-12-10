const START_TIME = new Date();

export function timediffMs(a, b) {
  return b.getTime() - a.getTime();
}
export function elapsed(startTime, ct) {
  ct = ct || new Date();
  return ct.getTime() - startTime.getTime();
}
export function later(cb, cbThisArg) {
  let t = setTimeout(function() {
    cb.call(cbThisArg);
  }, 0);
  return function() {
    if (t) {
      clearTimeout(t);
      t = null;
    }
  };
}
export function timeout(name, timeoutMs, ...args) {
  if (args.length === 1) {
    if (typeof args[0] === 'number') {
      name = null;
      timeoutMs = args[0];
    } else {
      timeoutMs = TIMEOUT;
    }
  } else if (args.length === 0) {
    name = null;
    timeoutMs = TIMEOUT;
  }
  const startTime = getTimeInMillis();
  return function() {
    if (getTimeInMillis() - startTime <= timeoutMs) {
      // Not timed out yet.
      return;
    }

    // Report the timeout.
    if (name) {
      throw new Error(
          'Timeout \'' + name + '\' after ' + timeoutMs + 'msecs exceeded.',
      );
    }
    throw new Error('Timeout after ' + timeoutMs + 'msecs exceeded.');
  };
}

