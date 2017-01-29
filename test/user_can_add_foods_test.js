var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('adding new foods', function(){
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

  test.it("allows me add a new food and clears form inputs", function(){

    driver.get('http://localhost:8080/foods.html')

    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var addFoodButton = driver.findElement({id: 'add-food-button'});

    name.sendKeys('orange');
    calories.sendKeys(500);
    addFoodButton.click();
    driver.sleep(1000);

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 2);

        rows[1].findElement(webdriver.By.className('food-name-cell')).getText().then(function(foodName){
          assert.equal(foodName, 'orange');
        });
      });
    });

    driver.executeScript('return window.localStorage["foods"]').then(function(storedFoods){
      assert.equal(storedFoods, '[{"id":1,"name":"orange","calories":"500"}]')
    });

    driver.findElement({name: 'name'}).getText().then(function(nameText){
      assert.equal(nameText, "");
    });

    driver.findElement({name: 'calories'}).getText().then(function(caloriesText){
      assert.equal(caloriesText, "")
    });

  });

  test.it("doesn't allow me to add foods if name is empty", function(){

    driver.get('http://localhost:8080/foods.html')

    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var addFoodButton = driver.findElement({id: 'add-food-button'});

    name.sendKeys('');
    calories.sendKeys(500);
    addFoodButton.click();
    driver.sleep(500);

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 1);
      });
    });

    driver.findElement({id: 'name-error'}).getText().then(function(errorText){
      assert.equal(errorText, 'Please enter a food name.')
    });
  });

  test.it("doesn't allow me to add foods if calories is empty", function(){

    driver.get('http://localhost:8080/foods.html')

    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var addFoodButton = driver.findElement({id: 'add-food-button'});

    name.sendKeys('orange');
    addFoodButton.click();
    driver.sleep(500);

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 1);
      });
    });

    driver.findElement({id: 'calorie-error'}).getText().then(function(errorText){
      assert.equal(errorText, 'Please enter a calorie count.')
    });
  });
});
