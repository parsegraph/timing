var assert = require("assert");
import todo from "../dist/timing";

describe("Package", function () {
  it("works", ()=>{
    assert.equal(todo(), 42);
  });
});
