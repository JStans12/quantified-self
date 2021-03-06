var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('a user can filter exercises', function(){
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

  test.it('allows a user to filter exercises', function(){

    driver.get('http://localhost:8080/exercises.html')

    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var addFoodButton = driver.findElement({id: 'add-exercise-button'});
    var filterField = driver.findElement({id: 'exercise-filter'})


    name.sendKeys('running');
    calories.sendKeys('500');
    addFoodButton.click()
    driver.sleep(1000);

    name.sendKeys('lifting');
    calories.sendKeys('500');
    addFoodButton.click()
    driver.sleep(1000);

    name.sendKeys('balling out');
    calories.sendKeys('500');
    addFoodButton.click()
    driver.sleep(1000);

    filterField.sendKeys('run');
    driver.sleep(1000);

    driver.findElement({id: 'exercises-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){

        rows[1].findElement(webdriver.By.className('exercise-name-cell')).getText().then(function(exerciseName){
          assert.equal(exerciseName, '');
        });

        rows[2].findElement(webdriver.By.className('exercise-name-cell')).getText().then(function(exerciseName){
          assert.equal(exerciseName, '');
        });

        rows[3].findElement(webdriver.By.className('exercise-name-cell')).getText().then(function(exerciseName){
          assert.equal(exerciseName, 'running');
        });
      });
    });
  });
});
