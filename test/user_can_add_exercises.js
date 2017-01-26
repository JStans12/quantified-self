var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('adding exercises.html', function(){
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

    driver.get('http://localhost:8080/exercises.html')

    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});

    name.sendKeys('running');
    name.getAttribute('value').then(function(value){
      assert.equal(value, 'running');
    });

    calories.sendKeys(500);
    calories.getAttribute('value').then(function(value){
      assert.equal(value, '500');
    });
  });

  test.it("allows me to add a new exercise and clears form inputs", function(){

    driver.get('http://localhost:8080/exercises.html')

    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var addExerciseButton = driver.findElement({id: 'add-exercise-button'});


    name.sendKeys('running');
    calories.sendKeys('500');
    addExerciseButton.click()
    driver.sleep(1000);

    driver.findElement({id: 'exercises-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 2);

        rows[1].findElement(webdriver.By.className('exercise-name-cell')).getText().then(function(exerciseName){
          assert.equal(exerciseName, 'running');
        });
      });
    });

    driver.findElement({name: 'name'}).getText().then(function(nameText){
      assert.equal(nameText, '');
    });

    driver.findElement({name: 'calories'}).getText().then(function(calorieText){
      assert.equal(calorieText, '');
    });
  });

  test.it("does not add exercise if name is empty", function(){

    driver.get('http://localhost:8080/exercises.html')

    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var addExerciseButton = driver.findElement({id: 'add-exercise-button'});

    name.sendKeys('');
    calories.sendKeys('500');
    addExerciseButton.click();
    driver.sleep(1000);

    driver.findElement({id: 'exercises-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 1);
      });
    });

    driver.findElement({id: 'name-error'}).getText().then(function(error){
      assert.equal(error, 'Please enter a exercise name.')
    });
  });

  test.it("does not add exercise if calories are empty", function(){

    driver.get('http://localhost:8080/exercises.html')

    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var addExerciseButton = driver.findElement({id: 'add-exercise-button'});

    name.sendKeys('running');
    calories.sendKeys('');
    addExerciseButton.click();
    driver.sleep(1000);

    driver.findElement({id: 'exercises-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 1);
      });
    });

    driver.findElement({id: 'calorie-error'}).getText().then(function(error){
      assert.equal(error, 'Please enter a calorie count.')
    });
  });
});
