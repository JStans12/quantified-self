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

  test.it("should allow me to add exercises to diary", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"running",calories:"4", display:"on"},{id:"2",name:"jumping",calories:"2", display:"on"},{id:"3",name:"balling out",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('exercises', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToExercises = driver.findElement({id: 'add-exercise'})

    driver.findElement({id: 'exercises-table-check'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000);
    addToExercises.click();

    driver.findElement({id: 'exercises-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 3);
        rows[1].findElement(webdriver.By.className('exercise-name-cell')).getText().then(function(ballingOut){
          assert.equal(ballingOut, "balling out");
        });
      });
    });
  });
});
