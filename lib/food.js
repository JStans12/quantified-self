var Food = function(name, calories){
  this.name = name;
  this.calories = calories;
}

Food.prototype.store = function(){
  var currentFoods = all();
  currentFoods.push({name: this.name, calories: this.calories});
  localStorage.setItem('foods', JSON.stringify(currentFoods));
}

Food.prototype.update = function(attribute, newValue){
  var currentFoods = all();
  for(var i=0; i<currentFoods.length; i++){
    if(currentFoods[i]['name'] == this.name){
      currentFoods[i][attribute] = newValue;
    }
  }
  localStorage.setItem('foods', JSON.stringify(currentFoods));
}

Food.find = function(checkName){
  var currentFoods = all();
  for(var i=0; i<currentFoods.length; i++){
    if(currentFoods[i]['name'] == checkName){
      return new Food(currentFoods[i]['name'], currentFoods[i]['calories'])
    }
  }
}

function all(){
  var currentFoods = localStorage.getItem('foods');
  if(currentFoods === null){currentFoods = '[]';}
  return JSON.parse(currentFoods);
}

module.exports = Food;
