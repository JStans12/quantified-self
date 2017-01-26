var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('deleting foods', function(){
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

  test.it("should allow me to delete foods", function(){

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
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(deleteButton){
          deleteButton.click()
        });
      });
    });

    driver.sleep(1000)

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 1);
      });
    });

    driver.executeScript('return window.localStorage["foods"]').then(function(storedFoods){
      assert.equal(storedFoods, '[]')
    });
  });
});
