var jQuery = require('jquery');
window.$ = jQuery;
var exercise = require('./exercise.js');
var exerciseTable = require('./exercises_table.js');

function populateExercises(){
  var currentExercises = localStorage.getItem('exercises');
  if(currentExercises !== null){
    var currentExercisesJSON = JSON.parse(currentExercises);
    for (var i = 0; i < currentExercisesJSON.length; i++) {
      var exerciseItem = new exercise(currentExercisesJSON[i]['name'], currentExercisesJSON[i]['calories'], currentExercisesJSON[i]['id'], currentExercisesJSON[i]['display']);
      if(exerciseItem.display == "on"){
        exerciseTable.appendTo(exerciseItem);
      }
    }
  }
}

 function clearExerciseForm(){
   $('#add-exercise-form input[name="name"]').val('');
   $('#add-exercise-form input[name="calories"]').val('');
 }

 function nameError(){
   $('#name-error').removeClass('hidden');
 }

 function caloriesError(){
   $('#calorie-error').removeClass('hidden');
 }

 function removeExerciseFromList(exerciseId){
   exerciseItem = exercise.find(exerciseId)
   exerciseItem.turnOff()
 }

 function removeErrors(){
   $('#name-error').addClass('hidden');
   $('#calorie-error').addClass('hidden');
 }

$(document).ready(function(){
  populateExercises();

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
      exerciseItem = new exercise(name, calories, exercise.nextId(), 'on');
      exerciseItem.store();
      exerciseTable.appendTo(exerciseItem);
      clearExerciseForm();
      removeErrors();
    }
  });

  $('#exercises-table').on('click', '.delete-button', function(){
    var exerciseId = $(this).parents('tr').data('exercise-id');
    removeExerciseFromList(exerciseId);
    $(this).parents('tr').remove();
  });

  $('#exercise-filter').keyup(function(){
    exerciseTable.filter();
  })

  $('#exercises-table').on('click', '.exercise-cell', function(e){
    var cell = $(this);
    var exerciseId = cell.parents('tr').data('exercise-id');

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
        exerciseTable.updateCell(cell, exerciseId, originalContent, newContent);
      }
    });
  });

  $('form').submit(function(e){
    e.preventDefault();
  })
});
