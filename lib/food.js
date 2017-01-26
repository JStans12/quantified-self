var Food = function(name, calories){
  this.name = name;
  this.calories = calories;
}

Food.prototype.store = function(){
  var currentFoods = localStorage.getItem('foods');
  if(currentFoods === null){currentFoods = '[]';}
  var currentFoodsJSON = JSON.parse(currentFoods);

  currentFoodsJSON.push({name: foodItem.name, calories: foodItem.calories});
  localStorage.setItem('foods', JSON.stringify(currentFoodsJSON));
}

module.exports = Food;
