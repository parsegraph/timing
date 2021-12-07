import AnimationTimer from "./AnimationTimer";
import IntervalTimer from "./IntervalTimer";
import TimeoutTimer from "./TimeoutTimer";
import getTimeInMillis from "parsegraph-gettimeinmillis";

export function timediffMs(a: Date, b: Date): number {
  return b.getTime() - a.getTime();
}

export function elapsed(startTime: Date, ct?: Date): number {
  ct = ct || new Date();
  return ct.getTime() - startTime.getTime();
}

export function later(cb: Function, cbThisArg?: any): Function {
  let t = setTimeout(function () {
    cb.call(cbThisArg);
  }, 0);
  return function () {
    if (t) {
      clearTimeout(t);
      t = null;
    }
  };
}

export const TIMEOUT = 30 * 1000;

export function timeout(
  name: string,
  timeoutMs: number,
  ...args: Array<any>
): Function {
  if (args.length === 1) {
    if (typeof args[0] === "number") {
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
  return function () {
    if (getTimeInMillis() - startTime <= timeoutMs) {
      // Not timed out yet.
      return;
    }

    // Report the timeout.
    if (name) {
      throw new Error(
        "Timeout '" + name + "' after " + timeoutMs + "msecs exceeded."
      );
    }
    throw new Error("Timeout after " + timeoutMs + "msecs exceeded.");
  };
}

export { AnimationTimer, IntervalTimer, TimeoutTimer };
