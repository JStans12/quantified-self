var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('adding new foods to diary', function(){
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

  test.it("should allow me to add breakfast to diary", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToBreakfast = driver.findElement({id: 'add-breakfast'})
    var addToDinner = driver.findElement({id: 'add-dinner'})
    var addToLunch = driver.findElement({id: 'add-lunch'})
    var addToSnack =  driver.findElement({id: 'add-snack'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000);
    addToBreakfast.click();

    driver.findElement({id: 'breakfasts-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('breakfast-name-cell')).getText().then(function(chicken){
          assert.equal(chicken, "chicken gizzards");
        });
      });
    });
  });

  test.it("should allow me to add lunch to diary", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToBreakfast = driver.findElement({id: 'add-breakfast'})
    var addToDinner = driver.findElement({id: 'add-dinner'})
    var addToLunches = driver.findElement({id: 'add-lunch'})
    var addToSnack =  driver.findElement({id: 'add-snack'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000);
    addToLunches.click();

    driver.findElement({id: 'lunches-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('lunche-name-cell')).getText().then(function(chicken){
          assert.equal(chicken, "chicken gizzards");
        });
      });
    });
  });
  test.it("should allow me to add dinner to diary", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToBreakfast = driver.findElement({id: 'add-breakfast'})
    var addToDinner = driver.findElement({id: 'add-dinner'})
    var addToLunches = driver.findElement({id: 'add-lunch'})
    var addToSnack =  driver.findElement({id: 'add-snack'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000);
    addToDinner.click();

    driver.findElement({id: 'dinners-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('dinner-name-cell')).getText().then(function(chicken){
          assert.equal(chicken, "chicken gizzards");
        });
      });
    });
  });

  test.it("should allow me to add snack to diary", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToBreakfast = driver.findElement({id: 'add-breakfast'})
    var addToDinner = driver.findElement({id: 'add-dinner'})
    var addToLunches = driver.findElement({id: 'add-lunch'})
    var addToSnack =  driver.findElement({id: 'add-snack'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000);
    addToSnack.click();

    driver.findElement({id: 'snacks-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('snack-name-cell')).getText().then(function(chicken){
          assert.equal(chicken, "chicken gizzards");
        });
      });
    });
  });

  test.it("totals appear on snack table", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToBreakfast = driver.findElement({id: 'add-breakfast'})
    var addToDinner = driver.findElement({id: 'add-dinner'})
    var addToLunches = driver.findElement({id: 'add-lunch'})
    var addToSnack =  driver.findElement({id: 'add-snack'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000);
    addToSnack.click();

    driver.findElement({id: 'snacks-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[2].findElement(webdriver.By.className('snacks-total')).getText().then(function(chicken){
          assert.equal(chicken, 4);
        });
      });
    });
  });
  test.it("totals appear on dinner table", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToBreakfast = driver.findElement({id: 'add-breakfast'})
    var addToDinner = driver.findElement({id: 'add-dinner'})
    var addToLunches = driver.findElement({id: 'add-lunch'})
    var addToSnack =  driver.findElement({id: 'add-snack'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000);
    addToDinner.click();

    driver.findElement({id: 'dinners-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[2].findElement(webdriver.By.className('dinners-total')).getText().then(function(chicken){
          assert.equal(chicken, 4);
        });
      });
    });
  });
  test.it("totals appear on lunches table", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToBreakfast = driver.findElement({id: 'add-breakfast'})
    var addToDinner = driver.findElement({id: 'add-dinner'})
    var addToLunches = driver.findElement({id: 'add-lunch'})
    var addToSnack =  driver.findElement({id: 'add-snack'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000);
    addToLunches.click();

    driver.findElement({id: 'lunches-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[2].findElement(webdriver.By.className('lunches-total')).getText().then(function(chicken){
          assert.equal(chicken, 4);
        });
      });
    });
  });
  test.it("totals appear on breakfast table", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

    driver.executeScript("window.localStorage.setItem('foods', '" + data + "');");

    driver.get('http://localhost:8080');

    var addToBreakfast = driver.findElement({id: 'add-breakfast'})
    var addToDinner = driver.findElement({id: 'add-dinner'})
    var addToLunches = driver.findElement({id: 'add-lunch'})
    var addToSnack =  driver.findElement({id: 'add-snack'})

    driver.findElement({id: 'foods-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        rows[1].findElement(webdriver.By.className('delete-cell')).then(function(checkBox){
          checkBox.click()
        });
      });
    });

    driver.sleep(2000);
    addToBreakfast.click();

    driver.findElement({id: 'breakfasts-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[2].findElement(webdriver.By.className('breakfasts-total')).getText().then(function(chicken){
          assert.equal(chicken, 4);
        });
      });
    });
  });

  test.it("goal appears on totals table", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

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

    driver.sleep(2000);
    addToBreakfast.click();

    driver.findElement({id: 'totals-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[0].findElement(webdriver.By.className('goal')).getText().then(function(goal){
          assert.equal(goal, 2000);
        });
      });
    });
  });
  test.it("consumed appears on totals table", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

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

    driver.sleep(2000);
    addToBreakfast.click();

    driver.findElement({id: 'totals-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('consumed')).getText().then(function(goal){
          assert.equal(goal, 4);
        });
      });
    });
  });
  test.it("burned appears on totals table", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

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

    driver.sleep(2000);
    addToBreakfast.click();

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

    driver.findElement({id: 'totals-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[2].findElement(webdriver.By.className('burned')).getText().then(function(goal){
          assert.equal(goal, 4);
        });
      });
    });
    driver.findElement({id: 'totals-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[3].findElement(webdriver.By.className('remaining-cal')).getText().then(function(goal){
          assert.equal(goal, 2000);
        });
      });
    });
  });
  test.it("remaining-cal does math and appears on totals table", function(){

    driver.get('http://localhost:8080')

    var data = JSON.stringify([{id:"1",name:"steak",calories:"4", display:"on"},{id:"2",name:"potatos",calories:"2", display:"on"},{id:"3",name:"chicken gizzards",calories:"4", display:"on"}])

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

    driver.sleep(2000);
    addToBreakfast.click();

    driver.findElement({id: 'totals-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[3].findElement(webdriver.By.className('remaining-cal')).getText().then(function(goal){
          assert.equal(goal, 1996);
        });
      });
    });
  });
});
