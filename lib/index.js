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
var exerciseTable = require('./exercises_table.js');
var diary = require('./diary.js');
var currentDiary;

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
      if(exerciseItem.display == 'on'){
        exerciseTable.appendToDiary(exerciseItem);
      }
    }
  }
}

function populateBreakfasts(){
  var todaysBreakfast = currentDiary.getMeal('breakfast')
  for (var i = 0; i < todaysBreakfast.length; i++) {
    breakfastTable.appendTo(todaysBreakfast[i]);
  }
}

function populateLunch(){
  var todaysLunch = currentDiary.getMeal('lunch')
  for (var i = 0; i < todaysLunch.length; i++) {
    lunchTable.appendTo(todaysLunch[i]);
  }
}

function populateDinners(){
  var todaysDinner = currentDiary.getMeal('dinner')
  for (var i = 0; i < todaysDinner.length; i++) {
    dinnerTable.appendTo(todaysDinner[i]);
  }
}

function populateSnacks(){
  var todaysSnack = currentDiary.getMeal('snack')
  for (var i = 0; i < todaysSnack.length; i++) {
    snackTable.appendTo(todaysSnack[i]);
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

function populateRemainingCalories(sum, tag){
  var element = $(`${tag} .remaining`)
  if(tag === '#snacks-table'){
    var remaining = 200 - sum
  } else if(tag === '#lunches-table'){
    var remaining = 600 - sum
  } else if(tag === '#dinners-table'){
    var remaining = 800 - sum
  } else if(tag === '#breakfasts-table'){
    var remaining = 400 - sum
  }
  if(remaining < 0) {
    element.html(remaining).css('color', 'red');
  } else if(remaining > 0){
    element.html(remaining).css('color', 'green');

  };
};

function sumTotals (tag){
  var rows = document.querySelector(tag).getElementsByTagName('tr')
  var sum = 0;
  if(tag !== '#exercises-table'){
    for (var i = 1; i < rows.length - 2 ; i++){
      sum += parseFloat(rows[i].childNodes[1].firstChild.data);
    };
  } else {
    for (var i = 1; i < rows.length - 1 ; i++){
      sum += parseFloat(rows[i].childNodes[1].firstChild.data);
    }
  }
    populateRemainingCalories(sum, tag);
  populateTotals(sum, tag);
};

function populateDiary(){
  populateBreakfasts();
  populateLunch();
  populateDinners();
  populateSnacks();
}

$(document).ready(function(){
  populateFoods();
  populateExercises();

  var day = new Date();
  var prettyDay = day.toISOString().slice(0,10);
  $('#date').append(prettyDay);
  currentDiary = diary.findOrCreate(prettyDay);
  populateDiary();

  $('#previous').click(function(){
    day.setDate(day.getDate() - 1);
    var prettyDay = day.toISOString().slice(0,10);
    $('#date').html('');
    $('#date').append(prettyDay);
    currentDiary = diary.findOrCreate(prettyDay);
  });

  $('#next').click(function(){
    day.setDate(day.getDate() + 1);
    var prettyDay = day.toISOString().slice(0,10);
    $('#date').html('');
    $('#date').append(prettyDay);
    currentDiary = diary.findOrCreate(prettyDay);
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
      var id = $(this).parent().parents('tr').data('food-id');
      selected.push(id);
      currentDiary.update('breakfast', id);
    });
    addToBreakfast(selected)
    sumTotals(tag);
  });

  $('#add-lunch').click(function(){
    var tag = "#lunches-table"
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      var id = $(this).parent().parents('tr').data('food-id');
      selected.push(id);
      currentDiary.update('lunch', id);
    });
    addToLunch(selected);
    sumTotals(tag);
  });

  $('#add-dinner').click(function(){
    var tag = "#dinners-table"
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      var id = $(this).parent().parents('tr').data('food-id');
      selected.push(id);
      currentDiary.update('dinner', id);
    });
    addToDinner(selected);
    sumTotals(tag);
  });

  $('#add-snack').click(function(){
    var tag = "#snacks-table"
    var selected = [];
    $('#foods-table tr input:checked').each(function() {
      var id = $(this).parent().parents('tr').data('food-id');
      selected.push(id);
      currentDiary.update('snack', id);
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
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    $(this).parents('tr').remove();
    sumTotals(`#${tag}`);
  });

  $('#add-exercise').click(function(){
    var tag = "#exercises-table"
    var selected = [];
    $('#exercises-table-check tr input:checked').each(function() {
      var id = $(this).parent().parents('tr').data('exercise-id');
      selected.push(id);
      currentDiary.update('exercise', id);
    });
    addToExercises(selected);
    sumTotals(tag);
  });

  $('form').submit(function(e){
    e.preventDefault();
  });
});
