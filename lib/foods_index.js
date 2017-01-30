var jQuery = require('jquery');
window.$ = jQuery;
var food = require('./food.js');
var FoodsTable = require('./foods_table.js');
foodsTable = new FoodsTable('food');

function populateFoods(){
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories'], currentFoodsJSON[i]['id'], currentFoodsJSON[i]['display']);
      if(foodItem.display == "on"){
        foodsTable.appendTo(foodItem);
      }
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

function removeFoodFromList(foodId){
  foodItem = food.find(foodId)
  foodItem.turnOff()
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
      foodItem = new food(name, calories, food.nextId(), 'on');
      foodItem.store();
      foodsTable.appendTo(foodItem);
      clearFoodForm();
      removeErrors();
    }
  });

  $('#foods-table').on('click', '.delete-button', function(){
    var foodId = $(this).parents('tr').data('food-id');
    removeFoodFromList(foodId);
    $(this).parents('tr').remove();
  });

  $('#food-filter').keyup(function(){
    foodsTable.filter();
  })

  $('#foods-table').on('click', '.food-cell', function(e){
    var cell = $(this);
    var foodId = cell.parents('tr').data('food-id');

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
        foodsTable.updateCell(cell, foodId, originalContent, newContent);
      }
    });
  });

  $('form').submit(function(e){
    e.preventDefault();
  });
});
