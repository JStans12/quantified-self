var jQuery = require('jquery');
window.$ = jQuery;
var food = require('./food.js');
var exercise = require('./exercise.js')
var FoodsTable = require('./foods_table.js');
var breakfastTable = new FoodsTable('breakfast');
var dinnerTable = new FoodsTable('dinner');
var lunchTable = new FoodsTable('lunche');
var snackTable = new FoodsTable('snack');
var foodsTable = new FoodsTable('food');
var exerciseTable = require('./exercises_table.js')

function populateBreakfasts(){
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      breakfastTable.appendTo(foodItem);
    }
  }
}

function populateFoods(){
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
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      dinnerTable.appendTo(foodItem);
    }
  }
}

function populateLunch(){
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      lunchTable.appendTo(foodItem);
    }
  }
}
function populateSnacks(){
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      snackTable.appendTo(foodItem);
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
