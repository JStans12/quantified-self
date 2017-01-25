assert = require('chai').assert;
exercise = require('../lib/exercise');

describe("exercises have a name", function() {
  it("returns it's name when asked", function(){
    var running = new exercise("running", 250);
    assert.equal(running.name, "running");
  });
});

describe("exercises have calories", function() {
  it("returns it's calories when asked", function(){
    var running = new exercise("running", 250);
    assert.equal(running.calories, 250);
  });
});
