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

function addToBreakfast(foods){
  $.each(foods, function(index, item){
    foodItem = food.find(item)
    breakfastTable.appendTo(foodItem);
  });
}

function addToLunch(foods){
  $.each(foods, function(index, item){
    foodItem = food.find(item)
    lunchTable.appendTo(foodItem);
  });
}

function addToDinner(foods){
  $.each(foods, function(index, item){
    foodItem = food.find(item)
    dinnerTable.appendTo(foodItem);
  });
}

function addToSnack(foods){
  $.each(foods, function(index, item){
    foodItem = food.find(item)
    snackTable.appendTo(foodItem);
  });
}

function sumTotals (){

}

$(document).ready(function(){
  populateFoods();
  populateExercises();
  sumTotals();

  $('#create-new-food').click(function(){
    window.open('https://jstans12.github.io/quantified-self/foods.html')
  });

  $('#create-new-exercise').click(function(){
    window.open('https://jstans12.github.io/quantified-self/exercises.html')
  });

  $('#exercises-filter').keyup(function(){
    exerciseTable.filterDiary();
  });

  $('#foods-filter').keyup(function() {
    foodsTable.filter();
  });

  $('#add-breakfast').click(function(){
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      selected.push($(this).parent().siblings('.food-name-cell').text());
    });
    addToBreakfast(selected);
  });

  $('#add-lunch').click(function(){
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      selected.push($(this).parent().siblings('.food-name-cell').text());
    });
    addToLunch(selected);
  });

  $('#add-dinner').click(function(){
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      selected.push($(this).parent().siblings('.food-name-cell').text());
    });
    addToDinner(selected);
  });

  $('#add-snack').click(function(){
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      selected.push($(this).parent().siblings('.food-name-cell').text());
    });
    addToSnack(selected);
  });

  $('#dinners-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
  });

  $('#breakfasts-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
  });

  $('#lunches-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
  });

  $('#snacks-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
  });

  $('#exercises-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
  });

  $('form').submit(function(e){
    e.preventDefault();
  });
});
