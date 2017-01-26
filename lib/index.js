var food = require('./food.js')
var exercise = require('./exercise.js')

function storeNewFood(foodItem){
  var currentFoods = localStorage.getItem('foods');
  if(currentFoods === null){currentFoods = '[]';}
  var currentFoodsJSON = JSON.parse(currentFoods);

  currentFoodsJSON.push({name: foodItem.name, calories: foodItem.calories});
  localStorage.setItem('foods', JSON.stringify(currentFoodsJSON));
}

function populateFoods(){
  var currentFoods = localStorage.getItem('foods')
  if(currentFoods !== null){
    var currentFoodsJSON = JSON.parse(currentFoods);
    for (var i = 0; i < currentFoodsJSON.length; i++) {
      var foodItem = new food(currentFoodsJSON[i]['name'], currentFoodsJSON[i]['calories']);
      appendToFoods(foodItem);
    }
  }
}

function appendToFoods(foodItem){
  var deleteButton = '<button class="delete-button"><b>-</b></button>'
  $('#foods-table tr:first').after('<tr><td class="food-cell food-name-cell">' + foodItem.name + '</td><td class="food-cell food-calorie-cell">' + foodItem.calories + '</td><td class="delete-cell">' + deleteButton + '</td></tr>')
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

  // Exercises ------------------------------------------------

  function storeNewExercise(exerciseItem){
    var currentExercises = localStorage.getItem('exercises');
    if(currentExercises === null){currentExercises = '[]'};
    var currentExercisesJSON = JSON.parse(currentExercises);

    currentExercisesJSON.push({name: exerciseItem.name, calories: exerciseItem.calories});
    localStorage.setItem('exercises', JSON.stringify(currentExercisesJSON));
  }

function populateExercises(){
  var currentExercises = localStorage.getItem('exercises');
  if(currentExercises !== null){
    var currentExercisesJSON = JSON.parse(currentExercises);
    for (var i = 0; i < currentExercisesJSON.length; i++) {
      var exerciseItem = new exercise(currentExercisesJSON[i]['name'], currentExercisesJSON[i]['calories']);
      appendToExercises(exerciseItem);
    }
  }
}

 function appendToExercises(exerciseItem){
   var deleteButton = '<button class="delete-button"><b>-</b></button>'
   $('#exercises-table').append('<tr><td class="exercise-cell exercise-name-cell">' + exerciseItem.name + '</td><td class="exercise-cell exercise-calorie-cell">' + exerciseItem.calories + '</td><td class="delete-cell">' + deleteButton + '</td></tr>')
 }

 function clearExerciseForm(){
   $('#add-exercise-form input[name="name"]').val('');
   $('#add-exercise-form input[name="calories"]').val('');
 }

 function deleteExerciseFromStorage(name){
   var currentExercises = localStorage.getItem('exercises');
   var currentExercisesJSON = JSON.parse(currentExercises);
   for (var i = 0; i < currentExercisesJSON.length; i++) {
     if(currentExercisesJSON[i]['name'] === name){
       currentExercisesJSON.splice(i, 1);
     }
   }
   localStorage.setItem('exercises', JSON.stringify(currentExercisesJSON));
 }

 function filterExercises() {
   var input, filter, table, tr, td, i;
   input = document.getElementById("filter");
   filter = input.value.toUpperCase();
   table = document.getElementById("exercises-table");
   tr = table.getElementsByTagName("tr");

   for (i = 0; i < tr.length; i++) {
     td = tr[i].getElementsByTagName("td")[0];
     if (td) {
       if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
         tr[i].style.display = "";
       } else {
         tr[i].style.display = "none";
       }
     }
   }
 }

$(document).ready(function(){
  populateFoods();
  populateExercises();

  $('#add-food-button').click(function(){
    var name = $('#add-food-form input[name="name"]').val();
    var calories = $('#add-food-form input[name="calories"]').val();
    if(name === ''){
      nameError();
    } else if(calories === ''){
      caloriesError();
    } else {
      foodItem = new food(name, calories)

      storeNewFood(foodItem);
      appendToFoods(foodItem);
      clearFoodForm();
      removeErrors();
    }
  });

  $('#foods-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.food-name-cell').html();
    deleteFoodFromStorage(name);
    $(this).parents('tr').remove();
  });

  // Exercises ---------------------------------------------------

  $('#add-exercise-button').click(function(){
    var name = $('#add-exercise-form input[name="name"]').val();
    var calories = $('#add-exercise-form input[name="calories"]').val();
    if(name === ''){
      nameError();
    } else if(calories === ''){
      caloriesError();
    } else {
      exerciseItem = new exercise(name, calories)

      storeNewExercise(exerciseItem);
      appendToExercises(exerciseItem);
      clearExerciseForm();
      removeErrors();
    }
  });

  $('#exercises-table').on('click', '.delete-button', function(){
    var name = $(this).parent().siblings('.exercise-name-cell').html();
    deleteExerciseFromStorage(name);
    $(this).parents('tr').remove();
  });

  $('#filter').keyup(function(){
    filterExercises();
  })

  $('form').submit(function(e){
    e.preventDefault();
  })

});
