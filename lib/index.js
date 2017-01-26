var food = require('./food.js')
var exercise = require('./exercise.js')

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

function filterFoods(){
  var input = document.getElementById('food-filter')
  var filter = input.value.toUpperCase();
  var table = document.getElementById('foods-table');
  var tr = table.getElementsByTagName('tr');

  for (var i = 0; i < tr.length; i++) {
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
   $('#exercises-table tr:first').after('<tr><td class="exercise-cell exercise-name-cell">' + exerciseItem.name + '</td><td class="exercise-cell exercise-calorie-cell">' + exerciseItem.calories + '</td><td class="delete-cell">' + deleteButton + '</td></tr>')
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

   var input = document.getElementById('exercise-filter');
   var filter = input.value.toUpperCase();
   var table = document.getElementById('exercises-table');
   var tr = table.getElementsByTagName("tr");
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

 function updateCell(cell, originalContent, newContent){
   if(cell.hasClass('food-name-cell')){
     var foodItem = food.find(originalContent);
     foodItem.update('name', newContent);
   } else if(cell.hasClass('food-calorie-cell')){
     var foodName = cell.siblings('.food-name-cell').html();
     var foodItem = food.find(foodName);
     foodItem.update('calories', newContent)
   } else if(cell.hasClass('exercise-name-cell')){
     var exerciseItem = exercise.find(originalContent);
     exerciseItem.update('name', newContent);
   } else if(cell.hasClass('exercise-calorie-cell')){
     var exerciseName = cell.siblings('.exercise-name-cell').html();
     var exerciseItem = exercise.find(exerciseName);
     exerciseItem.update('calories', newContent);
   }
 }

$(document).ready(function(){
  populateFoods();
  populateExercises();

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

  $('#food-filter').keyup(function(){
    filterFoods();
  })


  // Exercises ---------------------------------------------------

  $('#add-exercise-button').click(function(){
    var name = $('#add-exercise-form input[name="name"]').val();
    var calories = $('#add-exercise-form input[name="calories"]').val();
    if(name === ''){
      removeErrors()
      nameError();
    } else if(calories === ''){
      removeErrors()
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

  $('#exercise-filter').keyup(function(){
    filterExercises();
  })


  $('form').submit(function(e){
    e.preventDefault();
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
        updateCell(cell, originalContent, newContent);
      }
    });
  });

  $('#exercises-table').on('click', '.exercise-cell', function(e){
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
        updateCell(cell, originalContent, newContent);
      }
    });
  });
});
