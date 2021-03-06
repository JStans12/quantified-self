# About

Quantified self is the first JavaScript Application built in the Back-End Engineering program at the Turing School of Software and Design. The project has been built to the specifications provided [here](http://backend.turing.io/module4/projects/quantified-self).

## Objectives
  * Figuring out life in WebPack
  * Walking in a Front-End Developer's shoes
  * JQuery based State Management and DOM Traversal
  * Conduct feature testing using Selenium
  * Practice using the Pivotal Tracker project management tool


## Initial Setup

To get you started building your Quantified Self app, clone the repo, then:
```
npm install
npm run build
```

## Run the Server

use ```npm start```

Once the server is running, visit in your browser:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

## Run Tests in the Terminal

To run the test suite:

```js
npm test
```

## File Organization

Webpack is a little opinionated about how files are organized. Here is a brief guide on how to organize development and test files.

### Development Files

Node and webpack work together to help us organize our files and keep responsibilities separated.

For example, if we have the `lib/index.js` file and a `lib/food.js` file:

**lib/index.js**

```javascript
var Food = require('./food');

var someFood = new Food();
```

**lib/food.js**

```javascript
function Food(food, calories) {
  this.name = name;
  this.calories = calories;
}

Food.prototype.edit = function () {
  //Some cool storage stuff here
};

module.exports = Food;
```

All of the `food.js` code could live in the `index.js` file, but that would go against our philosophy of separating responsibility between files.

There are two main things to pay attention to here:

1. At the top of the `index.js` file, we require the `food.js` file using the line of code `var Food = require('./food');` (we leave out the `.js`). This brings in the code from the `food.js` file so we can use that file's code in the `index.js` file.

2. In the `food.js` file, the bottom line says `module.exports = Food;` which says what we want this file to export when we say `require` in other files, like in `index.js`.

So now we have two files that can share code between each other, but we have to pay attention to what we export and what we require. If we didn't do this, then when we try to make a new Food in the `index.js` file, it won't know what Food we're talking about!

### Test Files

Test file organization is a bit different from development files. If we want to test the `food.js` file from above, then this is how we would do it. For each object file (in this case `food.js`), we want to have a corresponding test file. So in the `test` directory, we would create a new file called `test/food-test.js`. Here is what that file would look like:

**test/food-test.js**

```javascript
var chai = require('chai');
var assert = chai.assert;

var Food = require('../lib/food');

describe('Food', function() {
  context('can create a new food', function() {
    // Your tests here...  
  });  
});
```

**test/index.js**

```javascript
require('./food-test')
```

Two main points to pay attention to:

1. In the `food-test.js` file, we require the `food.js` file so that we can construct foods in our tests.

2. In the `test/index.js` file, we require the `food-test.js` file so that we can view the test results in the browser (at `http://localhost:8080/webpack-dev-server/test.html`). But most of the time, you'll just run your tests in the terminal with `npm test`
