assert = require('chai').assert;
food = require('../lib/food');

describe("foods have a name", function(){
  it("returns it's name when asked", function(){
    var orange = new food("orange", 500);
    assert.equal(orange.name, "orange");
  });
});

describe("foods have calories", function(){
  it("returns it's calorie count when asked", function(){
    var orange = new food("orange", 500);
    assert.equal(orange.calories, 500);
  });
});
