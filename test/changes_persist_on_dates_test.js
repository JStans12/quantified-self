var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('changing dates on the diary', function(){
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

  test.it("should remember yesterdays meals", function(){

    driver.get('http://localhost:8080')

    var foods      = JSON.stringify([{id: "1",name:"orange",calories:"4", display:"on"},{id:"2",name:"banana",calories:"2", display:"on"},{id:"3",name:"apple",calories:"4", display:"on"}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foods + "');");

    var date     = new Date();
    var today          = JSON.stringify({date: date.toISOString().slice(0,10), breakfast: [1], lunch: [2], dinner: [3], snack: [1], exercises: []});
    date.setDate(date.getDate() - 1);
    var yesterday      = JSON.stringify({date: date.toISOString().slice(0,10), breakfast: [3], lunch: [1], dinner: [2], snack: [3], exercises: []});
    driver.executeScript("window.localStorage.setItem('diaries', '[" + [yesterday, today] + "]');");

    driver.get('http://localhost:8080');
    var prev = driver.findElement({id: 'previous'});

    driver.findElement({id: 'breakfasts-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('breakfast-name-cell')).getText().then(function(orange){
          assert.equal(orange, "orange")
        });
      });
    });

    driver.findElement({id: 'lunches-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('lunche-name-cell')).getText().then(function(banana){
          assert.equal(banana, "banana");
        });
      });
    });

    driver.findElement({id: 'dinners-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('dinner-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple")
        });
      });
    });

    driver.findElement({id: 'snacks-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('snack-name-cell')).getText().then(function(orange){
          assert.equal(orange, "orange")
        });
      });
    });

    driver.sleep(4000);
    prev.click();

    driver.findElement({id: 'breakfasts-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('breakfast-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple");
        });
      });
    });

    driver.findElement({id: 'lunches-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('lunche-name-cell')).getText().then(function(orange){
          assert.equal(orange, "orange");
        });
      });
    });

    driver.findElement({id: 'dinners-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('dinner-name-cell')).getText().then(function(banana){
          assert.equal(banana, "banana");
        });
      });
    });

    driver.findElement({id: 'snacks-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('snack-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple");
        });
      });
    });
  });

  test.it("should remember tomorrows meals", function(){

    driver.get('http://localhost:8080')

    var foods      = JSON.stringify([{id: "1",name:"orange",calories:"4", display:"on"},{id:"2",name:"banana",calories:"2", display:"on"},{id:"3",name:"apple",calories:"4", display:"on"}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foods + "');");

    var date     = new Date();
    var today          = JSON.stringify({date: date.toISOString().slice(0,10), breakfast: [1], lunch: [2], dinner: [3], snack: [1], exercises: []});
    date.setDate(date.getDate() + 1);
    var tomrrow      = JSON.stringify({date: date.toISOString().slice(0,10), breakfast: [3], lunch: [1], dinner: [2], snack: [3], exercises: []});
    driver.executeScript("window.localStorage.setItem('diaries', '[" + [tomrrow, today] + "]');");

    driver.get('http://localhost:8080');
    var nxt = driver.findElement({id: 'next'});

    driver.findElement({id: 'breakfasts-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('breakfast-name-cell')).getText().then(function(orange){
          assert.equal(orange, "orange")
        });
      });
    });

    driver.findElement({id: 'lunches-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('lunche-name-cell')).getText().then(function(banana){
          assert.equal(banana, "banana");
        });
      });
    });

    driver.findElement({id: 'dinners-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('dinner-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple")
        });
      });
    });

    driver.findElement({id: 'snacks-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('snack-name-cell')).getText().then(function(orange){
          assert.equal(orange, "orange")
        });
      });
    });

    driver.sleep(4000);
    nxt.click();

    driver.findElement({id: 'breakfasts-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('breakfast-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple");
        });
      });
    });

    driver.findElement({id: 'lunches-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('lunche-name-cell')).getText().then(function(orange){
          assert.equal(orange, "orange");
        });
      });
    });

    driver.findElement({id: 'dinners-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('dinner-name-cell')).getText().then(function(banana){
          assert.equal(banana, "banana");
        });
      });
    });

    driver.findElement({id: 'snacks-table'}).then(function(table){
      table.findElements(webdriver.By.css('tr')).then(function(rows){
        assert.equal(rows.length, 4);
        rows[1].findElement(webdriver.By.className('snack-name-cell')).getText().then(function(apple){
          assert.equal(apple, "apple");
        });
      });
    });
  });
});
