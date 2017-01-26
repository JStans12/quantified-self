var Food = function(name, calories){
  this.name = name;
  this.calories = calories;
}

Food.prototype.store = function(){
  var currentFoods = current();
  currentFoods.push({name: this.name, calories: this.calories});
  localStorage.setItem('foods', JSON.stringify(currentFoods));
}

Food.updateName = function(originalName, newName){
  var currentFoods = current();
  for(var i=0; i<currentFoods.length; i++){
    if(currentFoods[i]['name'] == originalName){
      currentFoods[i]['name'] = newName;
    }
  }
  localStorage.setItem('foods', JSON.stringify(currentFoods));
}

Food.updateCalories = function(foodName, newCalories){
  var currentFoods = current();
  for(var i=0; i<currentFoods.length; i++){
    if(currentFoods[i]['name'] == foodName){
      currentFoods[i]['calories'] = newCalories;
    }
  }
  localStorage.setItem('foods', JSON.stringify(currentFoods));
}

function current(){
  var currentFoods = localStorage.getItem('foods');
  if(currentFoods === null){currentFoods = '[]';}
  return JSON.parse(currentFoods);
}

module.exports = Food;
