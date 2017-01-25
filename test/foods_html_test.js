var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('testing foods.html', function(){
  var driver;
  this.timeout(10000);

  test.beforeEach(function(){
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  });

  test.afterEach(function(){
      driver.quit();
  });

  test.it("should allow me to add name and calories", function(){

    driver.get('http://localhost:8080/foods.html')

    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});

    name.sendKeys('orange');
    name.getAttribute('value').then(function(value){
      assert.equal(value, 'orange');
    });

    calories.sendKeys(500);
    calories.getAttribute('value').then(function(value){
      assert.equal(value, '500');
    });
  });
});
