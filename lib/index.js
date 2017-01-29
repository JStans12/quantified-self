var jQuery = require('jquery');
window.$ = jQuery;
var food = require('./food.js');
var exercise = require('./exercise.js')
var FoodsTable = require('./foods_table.js');
var exerciseTable = require('./exercises_table.js')

function populateBreakfasts(){
  var foodsTable = new FoodsTable('breakfast');
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      foodsTable.appendTo(foodItem);
    }
  }
}

function populateFoods(){
  var foodsTable = new FoodsTable('food');
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      foodsTable.appendToDiary(foodItem);
    }
  }
}

function populateExercises(){
  var currentExercises = localStorage.getItem('exercises');
  if(currentExercises !== null){
    var currentExercisesJSON = JSON.parse(currentExercises);
    for (var i = 0; i < currentExercisesJSON.length; i++) {
      var exerciseItem = new exercise(currentExercisesJSON[i]['name'], currentExercisesJSON[i]['calories']);
      exerciseTable.appendTo(exerciseItem);
      exerciseTable.appendToDiary(exerciseItem);
    }
  }
}


function populateDinners(){
  var foodsTable = new FoodsTable('dinner');
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      foodsTable.appendTo(foodItem);
    }
  }
}

function populateLunch(){
  var foodsTable = new FoodsTable('lunche');
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      foodsTable.appendTo(foodItem);
    }
  }
}
function populateSnacks(){
  var foodsTable = new FoodsTable('snack');
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      foodsTable.appendTo(foodItem);
    }
  }
}

$(document).ready(function(){
  populateBreakfasts();
  populateLunch();
  populateSnacks();
  populateDinners();
  populateFoods();
  populateExercises();

  $('#create-new').click(function(){
    console.log('shit');
  });

  $('#exercises-filter').keyup(function(){
    exerciseTable.filterDiary();
  });

  $('#foods-filter').keyup(function() {
    foodsTable.filterDiary();
  });

  $('form').submit(function(e){
    e.preventDefault();
  });
});
