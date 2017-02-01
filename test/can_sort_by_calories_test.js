var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('adding new exercises to diary', function(){
  var driver;
  this.timeout(20000);

  test.beforeEach(function(){
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  });

  test.afterEach(function(){
      driver.quit();
  });

  test.it("should allow me to sort foods table by calories", function(){

    driver.get('http://localhost:8080')

    var foods = JSON.stringify([{id: "1",name:"orange",calories:"4", display:"on"},{id:"2",name:"banana",calories:"2", display:"on"},{id:"3",name:"apple",calories:"3", display:"on"}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foods + "');");

    driver.get('http://localhost:8080')
    var calories = driver.findElement({id: 'foods-calories-header'});

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('food-calorie-cell')).getText().then(function(cals){
          assert.equal(cals, '3');
        });
      });
    });

    calories.click();
    driver.sleep(3000);

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('food-calorie-cell')).getText().then(function(cals){
          assert.equal(cals, '4');
        });
      });
    });

    calories.click();
    driver.sleep(3000);

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('food-calorie-cell')).getText().then(function(cals){
          assert.equal(cals, '2');
        });
      });
    });
  });

  test.it("should allow me to sort foods table by calories", function(){

    driver.get('http://localhost:8080')

    var foods = JSON.stringify([{id: "1",name:"orange",calories:"4", display:"on"},{id:"2",name:"banana",calories:"2", display:"on"},{id:"3",name:"apple",calories:"3", display:"on"}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + foods + "');");

    driver.get('http://localhost:8080')
    var calories = driver.findElement({id: 'exercises-calories-header'});

    driver.findElement({id: 'exercises-table-check'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('exercise-calorie-cell')).getText().then(function(cals){
          assert.equal(cals, '3');
        });
      });
    });

    calories.click();
    driver.sleep(3000);

    driver.findElement({id: 'exercises-table-check'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('exercise-calorie-cell')).getText().then(function(cals){
          assert.equal(cals, '4');
        });
      });
    });

    calories.click();
    driver.sleep(3000);

    driver.findElement({id: 'exercises-table-check'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('exercise-calorie-cell')).getText().then(function(cals){
          assert.equal(cals, '2');
        });
      });
    });
  });
});
