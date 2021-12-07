var assert = require("assert");
import { AnimationTimer, IntervalTimer, TimeoutTimer } from "../dist/timing";

describe("AnimationTimer", function () {
  it("works", () => {
    assert.ok(new AnimationTimer());
  });
});

describe("IntervalTimer", function () {
  it("works", () => {
    assert.ok(new IntervalTimer());
  });
});

describe("TimeoutTimer", function () {
  it("works", () => {
    assert.ok(new TimeoutTimer());
  });
});
