var jQuery = require('jquery');
window.$ = jQuery;
var exercise = require('./exercise.js')

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

 function nameError(){
   $('#name-error').removeClass('hidden');
 }

 function caloriesError(){
   $('#calorie-error').removeClass('hidden');
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

 function removeErrors(){
   $('#name-error').addClass('hidden');
   $('#calorie-error').addClass('hidden');
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
   if(cell.hasClass('exercise-name-cell')){
     var exerciseItem = exercise.find(originalContent);
     exerciseItem.update('name', newContent);
   } else if(cell.hasClass('exercise-calorie-cell')){
     var exerciseName = cell.siblings('.exercise-name-cell').html();
     var exerciseItem = exercise.find(exerciseName);
     exerciseItem.update('calories', newContent);
   }
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
      exerciseItem = new exercise(name, calories)
      exerciseItem.store();
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

  $('form').submit(function(e){
    e.preventDefault();
  })
});
