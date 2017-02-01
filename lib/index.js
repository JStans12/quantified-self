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

function populateFoods(foods){
  for (var i = 0; i < foods.length; i++) {
    if(foods[i].display == 'on'){
      foodsTable.appendToDiary(foods[i]);
    }
  }
}

function populateExercises(exercises){
  for (var i = 0; i < exercises.length; i++) {
    if(exercises[i].display == 'on'){
      exerciseTable.appendToDiary(exercises[i]);
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

function populateDiaryExercises(){
  var todaysExercise = currentDiary.getExercises();
  for (var i = 0; i < todaysExercise.length; i++) {
    exerciseTable.appendTo(todaysExercise[i]);
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

function totalsTable(){
  var breakfast = $('#breakfasts-table .total').html();
  var lunch = $('#lunches-table .total').html();
  var dinner = $('#dinners-table .total').html();
  var snacks = $('#snacks-table .total').html();
  var exercise = $('#exercises-table .total').html();
  var total = parseInt(breakfast) + parseInt(lunch) + parseInt(dinner) + parseInt(snacks);
  $('#totals-table .burned').html(exercise).css('color', 'green');
  $('#totals-table .consumed').html(total);
  remainingTotal();
}

function remainingTotal(){
  var today = parseInt($('#totals-table .goal').html()) - parseInt($('#totals-table .consumed').html()) + parseInt($('#totals-table .burned').html())
  if(today < 0){
    $('#totals-table .remaining-cal').html(today).css('color', 'red');
  } else if(today > 0){
    $('#totals-table .remaining-cal').html(today).css('color', 'green');
  };
}

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
  exerciseTable.clear();
  breakfastTable.clear();
  lunchTable.clear();
  dinnerTable.clear();
  snackTable.clear();
    populateBreakfasts();
    populateLunch();
    populateDinners();
    populateSnacks();
    populateDiaryExercises();
    sumTotals('#breakfasts-table');
    sumTotals('#dinners-table');
    sumTotals('#lunches-table');
    sumTotals('#snacks-table');
    sumTotals('#exercises-table');
    populateRemainingCalories();
    totalsTable();
}

function uncheckAll(){
  $('input[type="checkbox"]:checked').prop('checked',false);
}

$(document).ready(function(){

  populateFoods(food.getAll());
  populateExercises(exercise.getAll());
  totalsTable();

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
    populateDiary();
  });

  $('#next').click(function(){
    day.setDate(day.getDate() + 1);
    var prettyDay = day.toISOString().slice(0,10);
    $('#date').html('');
    $('#date').append(prettyDay);
    currentDiary = diary.findOrCreate(prettyDay);
    populateDiary();
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
    addToBreakfast(selected);
    sumTotals(tag);
    totalsTable();
    uncheckAll();
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
    totalsTable();
    uncheckAll();
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
    totalsTable();
    uncheckAll();
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
    totalsTable();
    uncheckAll();
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
    totalsTable();
    uncheckAll();
  });

  $('#dinners-table').on('click', '.delete-button', function(){
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    var id = $(this).parent().parents('tr').data('food-id');
    $(this).parents('tr').remove();
    currentDiary.remove('dinner', id);
    sumTotals(`#${tag}`);
    totalsTable();
  });

  $('#breakfasts-table').on('click', '.delete-button', function(){
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    var id = $(this).parent().parents('tr').data('food-id');
    $(this).parents('tr').remove();
    currentDiary.remove('breakfast', id);
    sumTotals(`#${tag}`);
    totalsTable();
  });

  $('#lunches-table').on('click', '.delete-button', function(){
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    var id = $(this).parent().parents('tr').data('food-id');
    $(this).parents('tr').remove();
    currentDiary.remove('lunch', id);
    sumTotals(`#${tag}`);
    totalsTable();
  });

  $('#snacks-table').on('click', '.delete-button', function(){
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    var id = $(this).parent().parents('tr').data('food-id');
    $(this).parents('tr').remove();
    currentDiary.remove('snack', id);
    sumTotals(`#${tag}`);
    totalsTable();
  });

  $('#exercises-table').on('click', '.delete-button', function(){
    var tag = $(this).closest("table").prop('id');
    var name = $(this).parent().siblings('.food-name-cell').html();
    var id = $(this).parent().parents('tr').data('exercise-id');
    $(this).parents('tr').remove();
    currentDiary.remove('exercise', id);
    sumTotals(`#${tag}`);
    totalsTable();
  });


  $('#exercises-calories-header').click(function(){
    exerciseTable.clearCheck();
    var order = $(this).data('order');
    if(order == 'normal'){
      $(this).data('order', 'desc');
      populateExercises(exercise.getDesc());
    } else if(order == 'desc'){
      $(this).data('order', 'asc');
      populateExercises(exercise.getAsc());
    } else if(order == 'asc'){
      $(this).data('order', 'normal');
      populateExercises(exercise.getAll());
    }
  });

  $('#foods-calories-header').click(function(){
    foodsTable.clearCheck();
    var order = $(this).data('order');
    if(order == 'normal'){
      $(this).data('order', 'desc');
      populateFoods(food.getDesc());
    } else if(order == 'desc'){
      $(this).data('order', 'asc');
      populateFoods(food.getAsc());
    } else if(order == 'asc'){
      $(this).data('order', 'normal');
      populateFoods(food.getAll());
    }
  });

  $('form').submit(function(e){
    e.preventDefault();
  });
});
