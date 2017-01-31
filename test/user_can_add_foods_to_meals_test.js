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

  test.it("should allow me to add foods to breakfast", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id: "1",name:"orange",calories:"4", display:"on"},{id:"2",name:"banana",calories:"2", display:"on"},{id:"3",name:"apple",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToBreakfast = driver.findElement({id: 'add-breakfast'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000)
    addToBreakfast.click();

    driver.findElement({id: 'breakfasts-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('breakfast-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple")
        });
      });
    });
  });

  test.it("should allow me to add foods to lunch", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id: "1",name:"orange",calories:"4", display:"on"},{id:"2",name:"banana",calories:"2", display:"on"},{id:"3",name:"apple",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToLunch = driver.findElement({id: 'add-lunch'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000)
    addToLunch.click();

    driver.findElement({id: 'lunches-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('lunche-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple")
        });
      });
    });
  });

  test.it("should allow me to add foods to dinner", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id: "1",name:"orange",calories:"4", display:"on"},{id:"2",name:"banana",calories:"2", display:"on"},{id:"3",name:"apple",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToDinner = driver.findElement({id: 'add-dinner'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000)
    addToDinner.click();

    driver.findElement({id: 'dinners-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('dinner-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple")
        });
      });
    });
  });

  test.it("should allow me to add foods to snack", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id: "1",name:"orange",calories:"4", display:"on"},{id:"2",name:"banana",calories:"2", display:"on"},{id:"3",name:"apple",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToSnack = driver.findElement({id: 'add-snack'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000)
    addToSnack.click();

    driver.findElement({id: 'snacks-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('snack-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple")
        });
      });
    });
  });
});
