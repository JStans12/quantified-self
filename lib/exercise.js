var Exercise = function(name, calories, id, display){
  this.name = name;
  this.calories = calories;
  this.id = id;
  this.display = display;
}

Exercise.nextId = function(){
  var currentExercises = all();
  if(currentExercises.length != 0){
    return currentExercises[currentExercises.length - 1]['id'] += 1;
  } else {
    return 1;
  }
}

Exercise.prototype.store = function(){
  var currentExercises = all();
  currentExercises.push({id: this.id, name: this.name, calories: this.calories, display: this.display});
  localStorage.setItem('exercises', JSON.stringify(currentExercises));
}

Exercise.prototype.update = function(attribute, newValue){
  var currentExercises = all();
  for(var i=0; i<currentExercises.length; i++){
    if(currentExercises[i]['id'] == this.id){
      currentExercises[i][attribute] = newValue;
    }
  }
  localStorage.setItem('exercises', JSON.stringify(currentExercises));
}

Exercise.prototype.turnOff = function(){
  var currentExercises = all();
  for(var i=0; i<currentExercises.length; i++){
    if(currentExercises[i]['id'] == this.id){
      currentExercises[i]['display'] = 'off';
    }
  }
  localStorage.setItem('exercises', JSON.stringify(currentExercises));
}

Exercise.find = function(checkId){
  var currentExercises = all();
  for(var i=0; i<currentExercises.length; i++){
    if(currentExercises[i]['id'] == checkId){
      return new Exercise(currentExercises[i]['name'], currentExercises[i]['calories'], currentExercises[i]['id'], currentExercises[i]['display'])
    }
  }
}

function all(){
  var currentExercises = localStorage.getItem('exercises');
  if(currentExercises === null){currentExercises = '[]';}
  return JSON.parse(currentExercises);
}

module.exports = Exercise;
