var Food = function(name, calories, id, display){
  this.name = name;
  this.calories = calories;
  this.id = id;
  this.display = display;
}

Food.nextId = function(){
  var currentFoods = all();
  if(currentFoods.length != 0){
    return currentFoods[currentFoods.length - 1]['id'] += 1;
  } else {
    return 1;
  }
}

Food.prototype.store = function(){
  var currentFoods = all();
  currentFoods.push({id: this.id, name: this.name, calories: this.calories, display: this.display});
  localStorage.setItem('foods', JSON.stringify(currentFoods));
}

Food.prototype.update = function(attribute, newValue){
  var currentFoods = all();
  for(var i=0; i<currentFoods.length; i++){
    if(currentFoods[i]['id'] == this.id){
      currentFoods[i][attribute] = newValue;
    }
  }
  localStorage.setItem('foods', JSON.stringify(currentFoods));
}

Food.prototype.turnOff = function(){
  var currentFoods = all();
  for(var i=0; i<currentFoods.length; i++){
    if(currentFoods[i]['id'] == this.id){
      currentFoods[i]['display'] = 'off';
    }
  }
  localStorage.setItem('foods', JSON.stringify(currentFoods));
}

Food.find = function(checkId){
  var currentFoods = all();
  for(var i=0; i<currentFoods.length; i++){
    if(currentFoods[i]['id'] == checkId){
      return new Food(currentFoods[i]['name'], currentFoods[i]['calories'], currentFoods[i]['id'], currentFoods[i]['display'])
    }
  }
}

Food.getAll = function(){
  var currentFoods = all();
  var foods = [];
  for (var i = 0; i < currentFoods.length; i++){
    foods.push(Food.find(currentFoods[i]['id']))
  }
  return foods;
}

Food.getDesc = function(){
  var currentFoods = all();
  var foods = [];
  for (var i = 0; i < currentFoods.length; i++){
    foods.push(Food.find(currentFoods[i]['id']))
  }
  foods.sort(function(a, b) {
    return a.calories - b.calories;
  });
  return foods;
}

Food.getAsc = function(){
  var currentFoods = all();
  var foods = [];
  for (var i = 0; i < currentFoods.length; i++){
    foods.push(Food.find(currentFoods[i]['id']))
  }
  foods.sort(function(a, b) {
    return b.calories - a.calories;
  });
  return foods;
}

function all(){
  var currentFoods = localStorage.getItem('foods');
  if(currentFoods === null){currentFoods = '[]';}
  return JSON.parse(currentFoods);
}

module.exports = Food;
