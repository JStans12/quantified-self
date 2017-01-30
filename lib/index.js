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
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories'], currentFoodsJSON[i]['id'], currentFoodsJSON[i]['display']);
      if(foodItem.display == 'on'){
        foodsTable.appendToDiary(foodItem);
      }
    }
  }
}

function populateExercises(){
  var currentExercises = localStorage.getItem('exercises');
  if(currentExercises !== null){
    var currentExercisesJSON = JSON.parse(currentExercises);
    for (var i = 0; i < currentExercisesJSON.length; i++) {
      var exerciseItem = new exercise(currentExercisesJSON[i]['name'], currentExercisesJSON[i]['calories'], currentExercisesJSON[i]['id'], currentExercisesJSON[i]['display']);
      if(foodItem.display == 'on'){
        exerciseTable.appendToDiary(exerciseItem);
      }
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
  $.each(foods, function(index, foodId){
    foodItem = food.find(foodId)
    breakfastTable.appendTo(foodItem);
  });
}

function addToLunch(foods){
  $.each(foods, function(index, foodId){
    foodItem = food.find(foodId)
    lunchTable.appendTo(foodItem);
  });
}

function addToDinner(foods){
  $.each(foods, function(index, foodId){
    foodItem = food.find(foodId)
    dinnerTable.appendTo(foodItem);
  });
}

function addToSnack(foods){
  $.each(foods, function(index, foodId){
    foodItem = food.find(foodId)
    snackTable.appendTo(foodItem);
  });
}


function addToExercises(exercises){
  $.each(exercises, function(index, exerciseId){
    foodItem = exercise.find(exerciseId);
    exerciseTable.appendTo(foodItem);
  });
}

function populateTotals(sum, tag){
    $(`${tag} .total`).html(sum)
};

// function populateRemainingCalories(sum, tag){
//   var remaining = 600 - sum
//   if(remaining > 0)
//   $(`${tag} .remaining`).html(remaining)
// }

function sumTotals (tag){
  var rows = document.querySelector(tag).getElementsByTagName('tr')
  var sum = 0;

  for (var i = 1; i < rows.length - 2 ; i++){
    sum += parseFloat(rows[i].childNodes[1].firstChild.data);
  };
  populateTotals(sum, tag);
};

$(document).ready(function(){
  populateFoods();
  populateExercises();

  var day = new Date();
  $('#date').append(day.toISOString().slice(0,10));

  $('#previous').click(function(){
    day.setDate(day.getDate() - 1);
    $('#date').html('');
    $('#date').append(day.toISOString().slice(0,10));
  });

  $('#next').click(function(){
    day.setDate(day.getDate() + 1);
    $('#date').html('');
    $('#date').append(day.toISOString().slice(0,10));
  });


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
    var tag = "#breakfasts-table"
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      selected.push($(this).parent().parents('tr').data('food-id'));
    });
    addToBreakfast(selected)
    sumTotals(tag);
  });

  $('#add-lunch').click(function(){
    var tag = "#lunches-table"
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      selected.push($(this).parent().parents('tr').data('food-id'));
    });
    addToLunch(selected);
    sumTotals(tag);
  });

  $('#add-dinner').click(function(){
    var tag = "#dinners-table"
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      selected.push($(this).parent().parents('tr').data('food-id'));
    });
    addToDinner(selected);
    sumTotals(tag);
  });

  $('#add-snack').click(function(){
    var tag = "#snacks-table"
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      selected.push($(this).parent().parents('tr').data('food-id'));
    });
    addToSnack(selected);
    sumTotals(tag);
  });


  $('#dinners-table').on('click', '.delete-button', function(){
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
    sumTotals(`#${tag}`);
  });

  $('#breakfasts-table').on('click', '.delete-button', function(){
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
    sumTotals(`#${tag}`);
  });

  $('#lunches-table').on('click', '.delete-button', function(){
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
    sumTotals(`#${tag}`);
  });

  $('#snacks-table').on('click', '.delete-button', function(){
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
    sumTotals(`#${tag}`);
  });

  $('#exercises-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
  });

  $('#add-exercise').click(function(){
    var selected = [];
    $('#exercises-table-check tr input:checked').each(function() {
      selected.push($(this).parent().parents('tr').data('exercise-id'));
    });
    addToExercises(selected);
  });

  $('form').submit(function(e){
    e.preventDefault();
  });
});
