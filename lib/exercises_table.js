var exercise = require('./exercise.js');
var ExerciseTable = function(){}

ExerciseTable.appendTo = function(exerciseItem){
  var deleteButton = '<button class="delete-button"><b>-</b></button>'
  $('#exercises-table tr:first').after('<tr data-exercise-id="' + exerciseItem.id + '"><td class="exercise-cell exercise-name-cell">' + exerciseItem.name + '</td><td class="exercise-cell exercise-calorie-cell">' + exerciseItem.calories + '</td><td class="delete-cell">' + deleteButton + '</td></tr>');
}

ExerciseTable.appendToDiary = function(exerciseItem){
  var checkBox = '<input type="checkbox" name="exercise" id="checkbox-id">';
  $('#exercises-table-check tr:first').after('<tr data-exercise-id="' + exerciseItem.id + '"><td class="exercise-cell exercise-name-cell">' + exerciseItem.name + '</td><td class="exercise-cell exercise-calorie-cell">' + exerciseItem.calories + '</td><td class="delete-cell food-cell">' + checkBox + '</td></tr>');
}

ExerciseTable.filter = function(){
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

ExerciseTable.filterDiary = function(){
  var input = document.getElementById('exercise-filter');
  var filter = input.value.toUpperCase();
  var table = document.getElementById('exercises-table-check');
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

ExerciseTable.updateCell = function(cell, exerciseId, originalContent, newContent){
  if(cell.hasClass('exercise-name-cell')){
    var exerciseItem = exercise.find(exerciseId);
    exerciseItem.update('name', newContent);
  } else if(cell.hasClass('exercise-calorie-cell')){
    var exerciseName = cell.siblings('.exercise-name-cell').html();
    var exerciseItem = exercise.find(exerciseId);
    exerciseItem.update('calories', newContent);
  }
}

module.exports = ExerciseTable;
