var jQuery = require('jquery');
window.$ = jQuery;
var food = require('./food.js');
var foodsTable = require('./foods_table.js');

function populateFoods(){
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      foodsTable.appendTo(foodItem);
    }
  }
}

function clearFoodForm(){
  $('#add-food-form input[name="name"]').val('');
  $('#add-food-form input[name="calories"]').val('');
}

function nameError(){
  $('#name-error').removeClass('hidden');
}

function caloriesError(){
  $('#calorie-error').removeClass('hidden');
}

function deleteFoodFromStorage(name){
  var currentFoods = localStorage.getItem('foods');
  var currentFoodsJSON = JSON.parse(currentFoods);
  for (var i = 0; i < currentFoodsJSON.length; i++) {
    if(currentFoodsJSON[i]['name'] === name){
      currentFoodsJSON.splice(i, 1);
    }
  }
  localStorage.setItem('foods', JSON.stringify(currentFoodsJSON));
}

function removeErrors(){
  $('#name-error').addClass('hidden');
  $('#calorie-error').addClass('hidden');
}

$(document).ready(function(){
  populateFoods();

  $('#add-food-button').click(function(){
    var name = $('#add-food-form input[name="name"]').val();
    var calories = $('#add-food-form input[name="calories"]').val();
    if(name === ''){
      removeErrors()
      nameError();
    } else if(calories === ''){
      removeErrors()
      caloriesError();
    } else {
      foodItem = new food(name, calories)
      foodItem.store();
      foodsTable.appendTo(foodItem);
      clearFoodForm();
      removeErrors();
    }
  });

  $('#foods-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    deleteFoodFromStorage(name);
    $(this).parents('tr').remove();
  });

  $('#food-filter').keyup(function(){
    foodsTable.filter();
  })

  $('#foods-table').on('click', '.food-cell', function(e){
    var cell = $(this);

    if(e.target != document.activeElement){
      var originalContent = $(this).text();
      cell.html('<input type="text" value="' + originalContent + '"; />');
      cell.children().first().focus();
    } else {
      var originalContent = cell.children().first().text();
    }

    cell.children().first().on('keypress blur', function(e){
      e.stopImmediatePropagation();
      if(e.which == 13 || e.type == 'blur') {
        var newContent = $(this).val();
        $(this).parent().text(newContent);
        foodsTable.updateCell(cell, originalContent, newContent);
      }
    });
  });

  $('form').submit(function(e){
    e.preventDefault();
  });
});
