var Exercise = function(name, calories){
  this.name = name;
  this.calories = calories;
}

Exercise.prototype.store = function(){
  var currentExercises = all();
  currentExercises.push({name: this.name, calories: this.calories});
  localStorage.setItem('exercises', JSON.stringify(currentExercises));
}

Exercise.prototype.update = function(attribute, newValue){
  var currentExercises = all();
  for(var i=0; i<currentExercises.length; i++){
    if(currentExercises[i]['name'] == this.name){
      currentExercises[i][attribute] = newValue;
    }
  }
  localStorage.setItem('exercises', JSON.stringify(currentExercises));
}

Exercise.find = function(checkName){
  var currentExercises = all();
  for(var i=0; i<currentExercises.length; i++){
    if(currentExercises[i]['name'] == checkName){
      return new Exercise(currentExercises[i]['name'], currentExercises[i]['calories'])
    }
  }
}

function all(){
  var currentExercises = localStorage.getItem('exercises');
  if(currentExercises === null){currentExercises = '[]';}
  return JSON.parse(currentExercises);
}

module.exports = Exercise;
